import { createClient } from "./server";
import { supabaseAdmin } from "./admin";

export interface AdminSession {
  userId: string;
  email: string;
  role: string;
}

/**
 * Validates the current user session AND checks if the user is explicitly
 * present in the `admin_users` whitelist table.
 */
export async function verifyAdmin(): Promise<AdminSession | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !user.id || !user.email) {
      return null;
    }

    const { data: adminRecord, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("id, user_id, email, role")
      .eq("user_id", user.id)
      .single();

    if (adminError || !adminRecord) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
      role: adminRecord.role || "admin",
    };
  } catch (error) {
    console.error("Admin verification error:", error);
    return null;
  }
}
