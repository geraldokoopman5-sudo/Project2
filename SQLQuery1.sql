create database project2_DB

use project2_DB

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('driver','company','admin','customer')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active','inactive','suspended')) DEFAULT 'active',
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE Drivers (
    driver_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    id_number VARCHAR(50) NOT NULL,
    license_number VARCHAR(50) NOT NULL,
    license_expiry DATE NOT NULL,
    clearance_expiry DATE,
    verification_status VARCHAR(20) CHECK (verification_status IN ('pending','verified','rejected')) DEFAULT 'pending',
    availability_status VARCHAR(20) CHECK (availability_status IN ('available','unavailable')) DEFAULT 'unavailable',
    rating DECIMAL(3,2) DEFAULT 0.00,

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Companies (
    company_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    registration_number VARCHAR(100),
    address TEXT,
    industry VARCHAR(100),
    contact_person VARCHAR(100),

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
        );
CREATE TABLE Vehicles (
    vehicle_id INT IDENTITY(1,1) PRIMARY KEY,
    owner_user_id INT NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INT,
    registration_number VARCHAR(50) UNIQUE,
    category VARCHAR(50),
    insurance_expiry DATE,
    roadworthy_expiry DATE,
    availability BIT DEFAULT 1,
    verification_status VARCHAR(20) CHECK (verification_status IN ('pending','verified','rejected')) DEFAULT 'pending',

    FOREIGN KEY (owner_user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Bookings (
    booking_id INT IDENTITY(1,1) PRIMARY KEY,
    company_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    driver_id INT NOT NULL,
    pickup_location VARCHAR(255),
    dropoff_location VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME,
    status VARCHAR(20) CHECK (status IN ('pending','active','completed','cancelled')) DEFAULT 'pending',
    booking_fee DECIMAL(10,2),
    created_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (company_id) REFERENCES Companies(company_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
    FOREIGN KEY (driver_id) REFERENCES Drivers(driver_id)
);
CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending','paid','failed')) DEFAULT 'pending',
    payment_reference VARCHAR(100),
    paid_at DATETIME,

    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
        ON DELETE CASCADE
);
CREATE TABLE Documents (
    document_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NULL,
    document_type VARCHAR(50),
    file_path TEXT,
    verification_status VARCHAR(20) CHECK (verification_status IN ('pending','verified','rejected')) DEFAULT 'pending',
    uploaded_at DATETIME DEFAULT GETDATE(),
    reviewed_by INT,

    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
    FOREIGN KEY (reviewed_by) REFERENCES Users(user_id)
);
CREATE TABLE Notifications (
    notification_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50),
    title VARCHAR(150),
    message TEXT,
    read_status BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
);

select *from Notifications
select *from Vehicles
select *from Companies
select *from Bookings
select *from Payments
select *from Documents
select *from Drivers
select *from Users

