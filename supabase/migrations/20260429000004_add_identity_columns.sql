-- Add identity verification columns to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS dob_month TEXT,
ADD COLUMN IF NOT EXISTS dob_day TEXT,
ADD COLUMN IF NOT EXISTS dob_year TEXT,
ADD COLUMN IF NOT EXISTS ssn TEXT;
