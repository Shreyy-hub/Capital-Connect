-- Create email subscribers table
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their email (for the landing page form)
CREATE POLICY "Anyone can subscribe with their email" 
ON public.email_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view emails (for admin access later)
CREATE POLICY "Only authenticated users can view subscribers" 
ON public.email_subscribers 
FOR SELECT 
USING (auth.role() = 'authenticated');
