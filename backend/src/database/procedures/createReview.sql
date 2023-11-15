CREATE OR ALTER PROCEDURE createReview
    @review_id VARCHAR(500),
    @rating INT,
    @comment TEXT,
    @user_id VARCHAR(500)
AS
BEGIN
    INSERT INTO reviews(review_id, rating, comment, user_id)
    VALUES(@review_id, @rating, @comment, @user_id);
END;
