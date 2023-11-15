CREATE OR ALTER PROCEDURE deleteBooking
    @booking_id VARCHAR(500)
AS
BEGIN
    DELETE FROM bookings WHERE booking_id = @booking_id;
END;

