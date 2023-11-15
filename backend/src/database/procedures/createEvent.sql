CREATE OR ALTER PROCEDURE createEvent(
    @event_id VARCHAR(255),
    @destination VARCHAR(255),
    @duration INT,
    @start_date VARCHAR(255),
    @price DECIMAL(10, 2),
    @category_id VARCHAR(100)
)
AS
BEGIN
    INSERT INTO events(event_id,destination, duration, start_date, price, category_id)
    VALUES(@event_id,@destination, @duration, @start_date, @price, @category_id);
END;
