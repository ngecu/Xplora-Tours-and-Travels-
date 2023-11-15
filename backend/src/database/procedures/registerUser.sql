DELETE FROM users;


CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(100),
    @full_name VARCHAR(200),
    @email VARCHAR(300),
    @phone_number VARCHAR(20),
    @password VARCHAR(200)
)
AS
BEGIN
    DECLARE @role INT;

    IF NOT EXISTS (SELECT 1 FROM users)
    BEGIN

        SET @role = 1;
    END
    ELSE
    BEGIN

        SET @role = 0;
    END

    INSERT INTO users(user_id, full_name, email, phone_number, password, role)
    VALUES(@user_id, @full_name, @email, @phone_number, @password, @role)
END
