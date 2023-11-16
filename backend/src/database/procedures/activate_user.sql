
CREATE PROCEDURE activateUser
    @userId VARCHAR(500)
AS
BEGIN
    UPDATE users
    SET active = 1
    WHERE user_id = @userId;
END;
