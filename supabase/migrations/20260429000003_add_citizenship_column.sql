-- Add citizenship_status column to the loans table
ALTER TABLE loans 
ADD COLUMN IF NOT EXISTS citizenship_status TEXT DEFAULT 'us-citizen';
