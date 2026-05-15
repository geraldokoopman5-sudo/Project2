CREATE DATABASE Vehicle_Booking_System;
GO

USE Vehicle_Booking_System;
GO


CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('owner','company')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active','inactive','suspended')) DEFAULT 'active'
);

CREATE TABLE Vehicles (
    vehicle_id INT IDENTITY(1,1) PRIMARY KEY,
    owner_id INT NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INT,
    category VARCHAR(50),
    daily_rate DECIMAL(10,2),
    availability BIT DEFAULT 1,

    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

CREATE TABLE Bookings (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    company_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    total_cost DECIMAL(10,2),
    status VARCHAR(20) CHECK (status IN ('pending','confirmed','rejected','cancelled')) DEFAULT 'pending',

    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
    FOREIGN KEY (company_id) REFERENCES Users(user_id)
);
