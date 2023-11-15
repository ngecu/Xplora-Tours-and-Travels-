CREATE OR ALTER PROCEDURE updateBooking
    @booking_id VARCHAR(500),
    @event_id VARCHAR(500),
    @user_id VARCHAR(500)
AS
BEGIN
    UPDATE bookings
    SET event_id = @event_id, user_id = @user_id
    WHERE booking_id = @booking_id;
END;
