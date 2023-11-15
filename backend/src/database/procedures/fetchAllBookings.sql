CREATE OR ALTER PROCEDURE getAllBookings
AS
BEGIN
    SELECT 
        b.booking_id,
        b.event_id,
        e.destination AS event_destination,
        e.duration AS event_duration,
        e.start_date AS event_start_date,
        e.price AS event_price,
        u.user_id,
        u.full_name AS user_full_name,
        u.email AS user_email,
        u.phone_number AS user_phone_number
    FROM 
        bookings b
    INNER JOIN 
        events e ON b.event_id = e.event_id
    INNER JOIN 
        users u ON b.user_id = u.user_id;
END;
