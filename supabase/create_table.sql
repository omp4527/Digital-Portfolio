-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting messages using the Service Role Key
-- (By default, when service_role key is used, it bypasses RLS, but setting it explicitly is a good security practice)
CREATE POLICY "Allow service_role full access" ON public.contact_messages
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
