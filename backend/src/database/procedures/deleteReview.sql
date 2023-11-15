CREATE OR ALTER PROCEDURE deleteReview
    @review_id VARCHAR(500)
AS
BEGIN
    DELETE FROM reviews WHERE review_id = @review_id;
END;
