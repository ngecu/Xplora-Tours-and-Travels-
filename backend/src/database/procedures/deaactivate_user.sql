CREATE PROCEDURE deactivateUser
    @userId VARCHAR(500)
AS
BEGIN
    UPDATE users
    SET active = 0
    WHERE user_id = @userId;
END;
