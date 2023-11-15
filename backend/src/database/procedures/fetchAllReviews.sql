CREATE OR ALTER PROCEDURE fetchAllReviews
AS
BEGIN
    SELECT 
        r.review_id,
        r.rating,
        r.comment,
        r.user_id,
        u.full_name AS user_full_name,
        u.email AS user_email,
        u.phone_number AS user_phone_number
    FROM 
        reviews r
    INNER JOIN 
        users u ON r.user_id = u.user_id;
END;
