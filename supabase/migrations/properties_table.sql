-- Create the properties table
CREATE TABLE properties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    price TEXT NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    area INTEGER NOT NULL,
    image TEXT NOT NULL,
    status TEXT NOT NULL,
    yield TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
); 