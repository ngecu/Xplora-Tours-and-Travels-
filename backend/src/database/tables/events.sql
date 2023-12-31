CREATE TABLE events (
    event_id VARCHAR(500) PRIMARY KEY ,
    event_name VARCHAR(500),
    image VARCHAR(500),
    destination VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    start_date VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id VARCHAR(500) NOT NULL,
    active INT NOT NULL DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)

);
