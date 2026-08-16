-- Migration: 20260816_reference_exams.sql
-- Description: Create ge10_reference_exams table for PDF exam vaults across subjects and grades.

CREATE TABLE IF NOT EXISTS ge10_reference_exams (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject_id VARCHAR(50) NOT NULL,
    grade_tier VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    school_name VARCHAR(255),
    district VARCHAR(100),
    province VARCHAR(100) DEFAULT 'TP. Hồ Chí Minh',
    year VARCHAR(50),
    exam_pdf_url TEXT NOT NULL,
    solution_pdf_url TEXT,
    file_size_exam VARCHAR(50),
    file_size_solution VARCHAR(50),
    has_solution BOOLEAN DEFAULT true,
    total_views INTEGER DEFAULT 0,
    total_downloads INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ge10_ref_exams_context 
ON ge10_reference_exams (grade_tier, subject_id, category);

-- Enable RLS
ALTER TABLE ge10_reference_exams ENABLE ROW LEVEL SECURITY;
