CREATE TABLE bookings (
    booking_id VARCHAR(500) PRIMARY KEY,
    event_id VARCHAR(500),
    user_id VARCHAR(500),
    adults INT ,
    children INT,
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);