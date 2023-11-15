CREATE OR ALTER PROCEDURE updateUser
    @user_id VARCHAR(100),
    @full_name VARCHAR(200),
    @email VARCHAR(300),
    @phone_number VARCHAR(20),
    @password VARCHAR(200)
AS
BEGIN
    UPDATE users
    SET
        full_name = @full_name,
        email = @email,
        phone_number = @phone_number,
        password = @password
    WHERE user_id = @user_id;
END;
