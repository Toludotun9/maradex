-- Add loan detail columns to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_degree_type TEXT,
ADD COLUMN IF NOT EXISTS loan_law_school_state TEXT,
ADD COLUMN IF NOT EXISTS loan_law_school_name TEXT;
