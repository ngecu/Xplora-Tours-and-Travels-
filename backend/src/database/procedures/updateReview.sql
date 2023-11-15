CREATE OR ALTER PROCEDURE updateReview
    @review_id VARCHAR(500),
    @rating INT,
    @comment TEXT,
    @user_id VARCHAR(500)
AS
BEGIN
    UPDATE reviews
    SET rating = @rating, comment = @comment, user_id = @user_id
    WHERE review_id = @review_id;
END;
