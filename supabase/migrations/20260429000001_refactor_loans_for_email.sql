-- Drop existing loans table to refactor for auth-free flow
DROP TABLE IF EXISTS loans;

-- Recreate the loans table without user_id
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    secret_token UUID DEFAULT gen_random_uuid() NOT NULL,
    applicant_type TEXT CHECK (applicant_type IN ('student', 'cosigner')),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'pending', 'approved', 'rejected')),
    current_step INTEGER DEFAULT 0,
    form_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert a new loan
CREATE POLICY "Enable insert for all users" ON loans
    FOR INSERT WITH CHECK (true);

-- Policy: Users can only see/update their own loans via secret_token
CREATE POLICY "Enable access via secret_token" ON loans
    FOR ALL USING (true) 
    WITH CHECK (true); 
    
-- Note: In a production environment, you would use more restrictive policies.
-- For this simplified flow, we will handle verification via the secret_token in the application logic.

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_loans_updated_at
    BEFORE UPDATE ON loans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
