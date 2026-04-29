-- Create the loans table
CREATE TABLE IF NOT EXISTS loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    applicant_type TEXT CHECK (applicant_type IN ('student', 'cosigner')),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'pending', 'approved', 'rejected')),
    current_step INTEGER DEFAULT 0,
    form_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own loans
CREATE POLICY "Users can view own loans" ON loans
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own loans
CREATE POLICY "Users can insert own loans" ON loans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own loans
CREATE POLICY "Users can update own loans" ON loans
    FOR UPDATE USING (auth.uid() = user_id);

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
