CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(100),
    @full_name VARCHAR(200),
    @email VARCHAR(300),
    @phone_number VARCHAR(20),
    @password VARCHAR(200)
)
AS
BEGIN

    INSERT INTO users(user_id, full_name, email, phone_number,password)
    VALUES(@user_id, @full_name, @email, @phone_number,@password)

END