-- Add school information columns to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_school_state TEXT,
ADD COLUMN IF NOT EXISTS loan_school_name TEXT,
ADD COLUMN IF NOT EXISTS loan_school_outside_us BOOLEAN DEFAULT false;
