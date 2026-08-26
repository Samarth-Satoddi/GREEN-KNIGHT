import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/supabase/auth-check";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const validStatuses = ["new", "contacted", "in_progress", "converted", "closed"];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin privileges required." },
      { status: 403 }
    );
  }

  const { id } = await params;

  const { data: enquiry, error: enquiryError } = await supabaseAdmin
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (enquiryError || !enquiry) {
    return NextResponse.json(
      { success: false, error: "Enquiry not found." },
      { status: 404 }
    );
  }

  const { data: auditLogs } = await supabaseAdmin
    .from("enquiry_audit_logs")
    .select("*")
    .eq("enquiry_id", id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    success: true,
    enquiry,
    auditLogs: auditLogs || [],
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin privileges required." },
      { status: 403 }
    );
  }

  const { id } = await params;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { status: newStatus } = body;

  if (!newStatus || !validStatuses.includes(newStatus)) {
    return NextResponse.json(
      { success: false, error: "Invalid status value." },
      { status: 400 }
    );
  }

  // Fetch current enquiry to check old status
  const { data: currentEnquiry, error: fetchError } = await supabaseAdmin
    .from("contact_submissions")
    .select("status")
    .eq("id", id)
    .single();

  if (fetchError || !currentEnquiry) {
    return NextResponse.json(
      { success: false, error: "Enquiry not found." },
      { status: 404 }
    );
  }

  const oldStatus = currentEnquiry.status;

  // Update status in contact_submissions
  const { data: updatedEnquiry, error: updateError } = await supabaseAdmin
    .from("contact_submissions")
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    console.error("[Status Update Error]:", updateError);
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry status." },
      { status: 500 }
    );
  }

  // Insert audit log entry if status changed
  if (oldStatus !== newStatus) {
    const { error: auditError } = await supabaseAdmin
      .from("enquiry_audit_logs")
      .insert({
        enquiry_id: id,
        admin_user_id: admin.userId,
        admin_email: admin.email,
        old_status: oldStatus,
        new_status: newStatus,
      });

    if (auditError) {
      console.error("[Audit Log Error]:", auditError);
    }
  }

  return NextResponse.json({
    success: true,
    enquiry: updatedEnquiry,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Admin privileges required." },
      { status: 403 }
    );
  }

  const { id } = await params;

  const { error: deleteError } = await supabaseAdmin
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("[Delete Error]:", deleteError);
    return NextResponse.json(
      { success: false, error: "Failed to delete enquiry." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Enquiry deleted successfully.",
  });
}
