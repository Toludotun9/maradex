-- Add columns to support cosigner preferences, delivery routes, and custom cosigner session access keys
ALTER TABLE loans
ADD COLUMN IF NOT EXISTS has_cosigner BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS cosigner_code_delivery_method TEXT DEFAULT 'student_email',
ADD COLUMN IF NOT EXISTS cosigner_email_address TEXT,
ADD COLUMN IF NOT EXISTS cosigner_access_code TEXT;
