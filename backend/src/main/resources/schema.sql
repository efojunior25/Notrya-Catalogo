CREATE TABLE products (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          price DECIMAL(10,2) NOT NULL,
                          stock INT NOT NULL,
                          category VARCHAR(50) NOT NULL,
                          size VARCHAR(20) NOT NULL,
                          color VARCHAR(50) NOT NULL,
                          brand VARCHAR(100) NOT NULL,
                          material VARCHAR(100) NOT NULL,
                          gender VARCHAR(20) NOT NULL,
                          image_url VARCHAR(500),
                          active BOOLEAN DEFAULT true,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          version INT DEFAULT 0
);