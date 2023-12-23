--Schema for MS SQL

-- User Table
CREATE TABLE users (
    user_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_name VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT 'placeholder.png',
    role VARCHAR(7) NOT NULL CHECK (role IN ('Student', 'Faculty')),
    is_verified BIT NOT NULL
);

-- Question Group Table
CREATE TABLE question_group (
    question_group_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name VARCHAR(255) NOT NULL
);

-- Question Bank Table
CREATE TABLE question_bank (
    question_bank_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(255) NOT NULL,
    created_by UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Questions Table
CREATE TABLE question (
    question_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    question TEXT NOT NULL,
    choices NVARCHAR(MAX) NOT NULL, -- Changed to NVARCHAR(MAX) to store JSON data
    correct_answer TEXT NOT NULL,
    points INT NOT NULL,
    knowledge_dimension VARCHAR(255) NOT NULL CHECK (knowledge_dimension IN ('Factual', 'Conceptual', 'Procedural', 'Metacognitive')),
    cognitive_process_dimension VARCHAR(255) NOT NULL CHECK (cognitive_process_dimension IN ('Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create')),
    question_bank_id UNIQUEIDENTIFIER NOT NULL,
    question_group_id UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (question_bank_id) REFERENCES question_bank(question_bank_id),
    FOREIGN KEY (question_group_id) REFERENCES question_group(question_group_id)
);

-- Exam Table
CREATE TABLE exam (
    exam_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    start_date_time DATETIME NOT NULL,
    end_date_time DATETIME NOT NULL,
    exam_code VARCHAR(255) NOT NULL,
    user_id UNIQUEIDENTIFIER NOT NULL,
    question_group_id UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (question_group_id) REFERENCES question_group(question_group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Exam Result Table
CREATE TABLE exam_result (
    exam_result_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    exam_id UNIQUEIDENTIFIER NOT NULL,
    user_id UNIQUEIDENTIFIER NOT NULL,
    score INT NOT NULL,
    remark VARCHAR(10) NOT NULL CHECK (remark IN ('Passed', 'Failed')),
    time_spent VARCHAR(255) NOT NULL,
    date_taken DATETIME NOT NULL,
    student_answers NVARCHAR(MAX), -- Changed to NVARCHAR(MAX) to store array as JSON
    correct_answers NVARCHAR(MAX), -- Changed to NVARCHAR(MAX) to store array as JSON
    FOREIGN KEY (exam_id) REFERENCES exam(exam_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
