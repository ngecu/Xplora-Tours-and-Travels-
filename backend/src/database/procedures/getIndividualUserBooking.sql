DROP PROCEDURE getBookingById


CREATE  PROCEDURE getBookingById
    @user_id VARCHAR(500)
AS
BEGIN
    SELECT 
        b.booking_id,
        e.destination,
        e.duration,
        e.start_date,
        e.price,
        c.category_name,
        u.full_name AS user_full_name,
        u.email AS user_email,
        u.phone_number AS user_phone_number
    FROM bookings b
    JOIN events e ON b.event_id = e.event_id
    JOIN categories c ON e.category_id = c.category_id
    JOIN users u ON b.user_id = u.user_id
    WHERE b.user_id = @user_id;
END;


CREATE PROCEDURE getBookingById
    @user_id VARCHAR(500)
AS
BEGIN
    SELECT 
        b.booking_id,
        b.adults,
        b.children,
        e.event_name,
        e.image_url,
        e.destination,
        e.duration,
        e.start_date,
        e.price,
        c.category_name,
        u.full_name AS user_full_name,
        u.email AS user_email,
        u.phone_number AS user_phone_number
    FROM bookings b
    JOIN events e ON b.event_id = e.event_id
    JOIN categories c ON e.category_id = c.category_id
    JOIN users u ON b.user_id = u.user_id
    WHERE b.user_id = @user_id;
END;
