CREATE TABLE reviews (
    review_id VARCHAR(500) PRIMARY KEY,
    rating INT,
    comment TEXT,
    user_id VARCHAR(500),
    created_at datetime default CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
