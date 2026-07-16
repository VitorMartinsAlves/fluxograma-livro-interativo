-- ============================================================
-- LIVRO DO ALUNO INTERATIVO
-- Banco: MySQL 8.x
-- Escopo: livros, páginas, frases, áudio de referência,
-- gravações, transcrições, tentativas e progresso.
-- ============================================================

CREATE TABLE IF NOT EXISTS student_books (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    language_code VARCHAR(20) NOT NULL,
    level VARCHAR(50) NULL,
    course_id BIGINT UNSIGNED NULL,
    class_id BIGINT UNSIGNED NULL,
    status ENUM('draft','processing','review','published','archived','error') NOT NULL DEFAULT 'draft',
    created_by BIGINT UNSIGNED NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_student_books_status (status),
    INDEX idx_student_books_course (course_id),
    INDEX idx_student_books_class (class_id)
);

CREATE TABLE IF NOT EXISTS student_book_files (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    file_type ENUM('original_pdf','page_image','thumbnail','reference_audio','other') NOT NULL,
    original_name VARCHAR(255) NULL,
    mime_type VARCHAR(100) NULL,
    file_url TEXT NOT NULL,
    storage_path TEXT NULL,
    size_bytes BIGINT UNSIGNED NULL,
    checksum_sha256 CHAR(64) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_book_files_book
        FOREIGN KEY (book_id) REFERENCES student_books(id) ON DELETE CASCADE,
    INDEX idx_book_files_book_type (book_id, file_type)
);

CREATE TABLE IF NOT EXISTS student_book_pages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    page_number INT UNSIGNED NOT NULL,
    image_url TEXT NULL,
    extracted_text LONGTEXT NULL,
    width INT UNSIGNED NULL,
    height INT UNSIGNED NULL,
    extraction_method ENUM('native_text','ocr','manual') NULL,
    processing_status ENUM('pending','processing','processed','error') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_book_pages_book
        FOREIGN KEY (book_id) REFERENCES student_books(id) ON DELETE CASCADE,
    UNIQUE KEY uq_book_page (book_id, page_number),
    INDEX idx_book_pages_book (book_id)
);

CREATE TABLE IF NOT EXISTS student_book_segments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    page_id BIGINT UNSIGNED NOT NULL,
    parent_segment_id BIGINT UNSIGNED NULL,
    segment_type ENUM('word','phrase','paragraph','dialogue','exercise','custom') NOT NULL DEFAULT 'phrase',
    text_content TEXT NOT NULL,
    normalized_text TEXT NULL,
    position_x DECIMAL(8,4) NULL,
    position_y DECIMAL(8,4) NULL,
    width DECIMAL(8,4) NULL,
    height DECIMAL(8,4) NULL,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    is_listenable BOOLEAN NOT NULL DEFAULT TRUE,
    is_practicable BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_book_segments_book
        FOREIGN KEY (book_id) REFERENCES student_books(id) ON DELETE CASCADE,
    CONSTRAINT fk_book_segments_page
        FOREIGN KEY (page_id) REFERENCES student_book_pages(id) ON DELETE CASCADE,
    CONSTRAINT fk_book_segments_parent
        FOREIGN KEY (parent_segment_id) REFERENCES student_book_segments(id) ON DELETE SET NULL,
    INDEX idx_book_segments_page_order (page_id, sort_order),
    INDEX idx_book_segments_practicable (book_id, is_practicable, is_active)
);

CREATE TABLE IF NOT EXISTS student_book_segment_audios (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    segment_id BIGINT UNSIGNED NOT NULL,
    source_type ENUM('tts','human_upload','book_original') NOT NULL,
    provider VARCHAR(100) NULL,
    model_name VARCHAR(100) NULL,
    voice_name VARCHAR(100) NULL,
    file_url TEXT NOT NULL,
    storage_path TEXT NULL,
    mime_type VARCHAR(100) NULL,
    duration_seconds DECIMAL(10,3) NULL,
    start_time_seconds DECIMAL(10,3) NULL,
    end_time_seconds DECIMAL(10,3) NULL,
    generation_settings JSON NULL,
    status ENUM('pending','processing','ready','error') NOT NULL DEFAULT 'pending',
    error_message TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_segment_audios_segment
        FOREIGN KEY (segment_id) REFERENCES student_book_segments(id) ON DELETE CASCADE,
    INDEX idx_segment_audios_segment (segment_id),
    INDEX idx_segment_audios_status (status)
);

CREATE TABLE IF NOT EXISTS student_book_assignments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    assignment_type ENUM('student','class','course','global') NOT NULL,
    reference_id BIGINT UNSIGNED NULL,
    available_from DATETIME NULL,
    available_until DATETIME NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by BIGINT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_book_assignments_book
        FOREIGN KEY (book_id) REFERENCES student_books(id) ON DELETE CASCADE,
    INDEX idx_book_assignments_lookup (assignment_type, reference_id, is_active),
    INDEX idx_book_assignments_book (book_id)
);

CREATE TABLE IF NOT EXISTS student_book_progress (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    student_id BIGINT UNSIGNED NOT NULL,
    current_page_id BIGINT UNSIGNED NULL,
    current_segment_id BIGINT UNSIGNED NULL,
    progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    listened_segments_count INT UNSIGNED NOT NULL DEFAULT 0,
    practiced_segments_count INT UNSIGNED NOT NULL DEFAULT 0,
    status ENUM('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
    started_at DATETIME NULL,
    completed_at DATETIME NULL,
    last_accessed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_book_progress_book
        FOREIGN KEY (book_id) REFERENCES student_books(id) ON DELETE CASCADE,
    CONSTRAINT fk_book_progress_page
        FOREIGN KEY (current_page_id) REFERENCES student_book_pages(id) ON DELETE SET NULL,
    CONSTRAINT fk_book_progress_segment
        FOREIGN KEY (current_segment_id) REFERENCES student_book_segments(id) ON DELETE SET NULL,
    UNIQUE KEY uq_student_book_progress (book_id, student_id),
    INDEX idx_book_progress_student (student_id),
    INDEX idx_book_progress_status (status)
);

CREATE TABLE IF NOT EXISTS student_recordings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    segment_id BIGINT UNSIGNED NOT NULL,
    file_url TEXT NULL,
    storage_path TEXT NULL,
    mime_type VARCHAR(100) NULL,
    duration_seconds DECIMAL(10,3) NULL,
    size_bytes BIGINT UNSIGNED NULL,
    retention_status ENUM('temporary','retained','deleted') NOT NULL DEFAULT 'temporary',
    delete_after DATETIME NULL,
    deleted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_recordings_segment
        FOREIGN KEY (segment_id) REFERENCES student_book_segments(id) ON DELETE CASCADE,
    INDEX idx_student_recordings_student (student_id, created_at),
    INDEX idx_student_recordings_retention (retention_status, delete_after)
);

CREATE TABLE IF NOT EXISTS student_practice_attempts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    book_id BIGINT UNSIGNED NOT NULL,
    segment_id BIGINT UNSIGNED NOT NULL,
    recording_id BIGINT UNSIGNED NULL,
    attempt_number INT UNSIGNED NOT NULL,
    expected_text TEXT NOT NULL,
    recognized_text TEXT NULL,
    normalized_expected_text TEXT NULL,
    normalized_recognized_text TEXT NULL,
    similarity_score DECIMAL(5,2) NULL,
    required_score DECIMAL(5,2) NULL,
    result ENUM('pending','passed','needs_retry','processing_error') NOT NULL DEFAULT 'pending',
    processing_time_ms INT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_practice_attempts_book
        FOREIGN KEY (book_id) REFERENCES student_books(id) ON DELETE CASCADE,
    CONSTRAINT fk_practice_attempts_segment
        FOREIGN KEY (segment_id) REFERENCES student_book_segments(id) ON DELETE CASCADE,
    CONSTRAINT fk_practice_attempts_recording
        FOREIGN KEY (recording_id) REFERENCES student_recordings(id) ON DELETE SET NULL,
    INDEX idx_practice_attempts_student (student_id, created_at),
    INDEX idx_practice_attempts_segment (segment_id, result),
    UNIQUE KEY uq_student_segment_attempt (student_id, segment_id, attempt_number)
);

CREATE TABLE IF NOT EXISTS student_transcriptions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    attempt_id BIGINT UNSIGNED NOT NULL,
    provider VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    language_code VARCHAR(20) NULL,
    transcription_text TEXT NOT NULL,
    confidence_score DECIMAL(6,5) NULL,
    raw_response JSON NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_transcriptions_attempt
        FOREIGN KEY (attempt_id) REFERENCES student_practice_attempts(id) ON DELETE CASCADE,
    UNIQUE KEY uq_transcription_attempt (attempt_id)
);

CREATE TABLE IF NOT EXISTS student_practice_word_results (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    attempt_id BIGINT UNSIGNED NOT NULL,
    word_order INT UNSIGNED NOT NULL,
    expected_word VARCHAR(255) NULL,
    recognized_word VARCHAR(255) NULL,
    result_type ENUM('match','similar','omission','insertion','substitution') NOT NULL,
    similarity_score DECIMAL(5,2) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_word_results_attempt
        FOREIGN KEY (attempt_id) REFERENCES student_practice_attempts(id) ON DELETE CASCADE,
    INDEX idx_word_results_attempt_order (attempt_id, word_order),
    INDEX idx_word_results_type (result_type)
);

CREATE TABLE IF NOT EXISTS student_book_processing_jobs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NULL,
    segment_id BIGINT UNSIGNED NULL,
    attempt_id BIGINT UNSIGNED NULL,
    job_type ENUM('pdf_extract','pdf_ocr','page_render','tts_generate','audio_normalize','speech_transcribe','text_compare','cleanup_recording') NOT NULL,
    status ENUM('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
    provider VARCHAR(100) NULL,
    input_data JSON NULL,
    output_data JSON NULL,
    error_message TEXT NULL,
    retry_count INT UNSIGNED NOT NULL DEFAULT 0,
    started_at DATETIME NULL,
    finished_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_processing_jobs_book
        FOREIGN KEY (book_id) REFERENCES student_books(id) ON DELETE CASCADE,
    CONSTRAINT fk_processing_jobs_segment
        FOREIGN KEY (segment_id) REFERENCES student_book_segments(id) ON DELETE CASCADE,
    CONSTRAINT fk_processing_jobs_attempt
        FOREIGN KEY (attempt_id) REFERENCES student_practice_attempts(id) ON DELETE CASCADE,
    INDEX idx_processing_jobs_status (status, job_type),
    INDEX idx_processing_jobs_book (book_id)
);

-- ============================================================
-- OBSERVAÇÕES
-- ============================================================
-- 1. student_id, course_id, class_id e created_by devem receber
--    FKs para as tabelas reais da plataforma após validação.
-- 2. As gravações podem ser temporárias. O job cleanup_recording
--    remove arquivos conforme delete_after.
-- 3. similarity_score representa correspondência textual no MVP.
--    Não deve ser exibido como nota fonética de pronúncia.
-- 4. provider/model_name permitem trocar Whisper ou outro STT
--    sem alterar a estrutura do banco.
