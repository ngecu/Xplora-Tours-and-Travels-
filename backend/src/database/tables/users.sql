CREATE TABLE users (
    user_id VARCHAR(500) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL DEFAULT 0,
    welcomed INT Default 0
    active INT Default 1
);