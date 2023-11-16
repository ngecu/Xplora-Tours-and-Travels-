CREATE PROCEDURE manageProfile
    @new_password NVARCHAR(255),
    @user_id VARCHAR(500)
AS
BEGIN
    -- Update the user's password
    UPDATE users
    SET password = @new_password
    WHERE user_id = @user_id;
END;
