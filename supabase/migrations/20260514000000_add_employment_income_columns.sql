-- Add columns to capture employment and income information
ALTER TABLE loans
ADD COLUMN IF NOT EXISTS employment_status TEXT,
ADD COLUMN IF NOT EXISTS annual_income TEXT,
ADD COLUMN IF NOT EXISTS work_phone TEXT;
