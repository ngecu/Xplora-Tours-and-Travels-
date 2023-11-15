CREATE OR ALTER PROCEDURE createBooking
    @booking_id VARCHAR(500),
    @event_id VARCHAR(500),
    @user_id VARCHAR(500)
AS
BEGIN
    INSERT INTO bookings(booking_id, event_id, user_id)
    VALUES(@booking_id, @event_id, @user_id);
END;
