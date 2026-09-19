-- Migration: Add source and conversation columns to contact_submissions
-- Enables identification of chatbot leads vs contact form submissions
-- and stores full chatbot conversation history.

ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'contact_form';

ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS conversation jsonb;

-- Index on source column for efficient filtering in admin portal
CREATE INDEX IF NOT EXISTS idx_contact_submissions_source ON public.contact_submissions (source);
