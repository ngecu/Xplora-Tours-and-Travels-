

CREATE TABLE categories (
    category_id VARCHAR(500) PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE users (
    user_id VARCHAR(500) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL DEFAULT 0,
    welcomed INT Default 0,
    active INT Default 1
);

CREATE TABLE events (
    event_id VARCHAR(500) PRIMARY KEY ,
    image VARCHAR(500),
    destination VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    start_date VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id VARCHAR(500) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE bookings (
    booking_id VARCHAR(500) PRIMARY KEY,
    event_id VARCHAR(500),
    user_id VARCHAR(500),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE reviews (
    review_id VARCHAR(500) PRIMARY KEY,
    rating INT,
    comment TEXT,
    user_id VARCHAR(500),
    created_at datetime default CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

