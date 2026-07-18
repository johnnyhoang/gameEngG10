-- Migration: Create ge10_textbook_mappings table
CREATE TABLE IF NOT EXISTS ge10_textbook_mappings (
    category_key VARCHAR(100) PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    loai VARCHAR(100) NOT NULL,
    bai INTEGER NOT NULL DEFAULT 1,
    ham VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
