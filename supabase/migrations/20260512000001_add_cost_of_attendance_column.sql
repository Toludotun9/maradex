-- Add cost of attendance column to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS loan_cost_of_attendance TEXT;
