CREATE OR ALTER PROCEDURE deleteUser
    @user_id VARCHAR(100)
AS
BEGIN
    DELETE FROM users
    WHERE user_id = @user_id;
END;
