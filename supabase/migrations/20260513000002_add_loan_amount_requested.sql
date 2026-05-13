-- Add columns to capture the final requested loan amount and preference flags
ALTER TABLE loans
ADD COLUMN IF NOT EXISTS loan_amount_requested TEXT,
ADD COLUMN IF NOT EXISTS loan_use_calculated_need BOOLEAN DEFAULT true;
