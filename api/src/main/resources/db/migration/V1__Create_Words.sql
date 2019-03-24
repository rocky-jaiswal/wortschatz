CREATE TABLE words(
    id INTEGER PRIMARY KEY,
    english_word text NOT NULL,
    german_word text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);