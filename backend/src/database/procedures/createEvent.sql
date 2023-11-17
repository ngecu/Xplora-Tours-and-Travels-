CREATE OR ALTER PROCEDURE createEvent(
    @event_id VARCHAR(255),
    @event_name VARCHAR(500), -- Assuming you added event_name
    @image VARCHAR(500),
    @destination VARCHAR(255),
    @description VARCHAR(255),
    @duration INT,
    @start_date VARCHAR(255),
    @price DECIMAL(10, 2),
    @category_id VARCHAR(100)
)
AS
BEGIN
    INSERT INTO events(event_id, event_name, image, destination, description, duration, start_date, price, category_id )
    VALUES(@event_id, @event_name, @image, @destination, @description, @duration, @start_date, @price, @category_id);
END;
