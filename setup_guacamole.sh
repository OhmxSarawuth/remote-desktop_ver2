
#!/bin/bash

# Step 1: Run docker-compose
echo "Starting docker-compose..."
docker compose up -d

# Step 2: Create directory for initdb.sql
echo "Creating directory /opt/guacamole/mysql..."
mkdir -p /opt/guacamole/mysql

# Step 3: Extract initdb.sql from guacamole image
echo "Extracting initdb.sql from guacamole image..."
docker run --rm guacamole/guacamole /opt/guacamole/bin/initdb.sh --mysql > /opt/guacamole/mysql/01-initdb.sql

#watting mysql to be ready
echo "Waiting for MySQL to be ready..."
until docker exec guacamoledb mysqladmin ping -u root -p"$MYSQL_ROOT_PASSWORD" --silent; do
    sleep 2
    echo -n "."
done
echo "MySQL is ready!"

# get the pass word MySql root
read -s -p "Enter MySQL root password: " MYSQL_ROOT_PASSWORD
echo ""


# Step 4: Copy initdb.sql to guacamoledb container
echo "Copying initdb.sql to guacamoledb container..."
docker cp /opt/guacamole/mysql/01-initdb.sql guacamoledb:/docker-entrypoint-initdb.d/

# Step 5: Execute SQL commands inside guacamoledb container
echo "Initializing MySQL database in guacamoledb container..."
docker exec -i guacamoledb mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOF
#create databse
CREATE DATABASE IF NOT EXISTS guacdb;
USE guacdb;
#init db
SOURCE /docker-entrypoint-initdb.d/01-initdb.sql;
#create user
DROP USER IF EXISTS 'guacadmin'@'%';
CREATE USER 'guacadmin'@'%' IDENTIFIED BY 'password';
#check permision user
#SHOW GRANTS FOR 'guacadmin'@'%';
GRANT ALL PRIVILEGES ON guacamole_db.* TO 'guacadmin'@'%';
FLUSH PRIVILEGES;
EOF


# Step 6: Create shared folder and set permissions
echo "Setting up shared folder /guacamole/drive..."
mkdir -p /guacamole/drive

chmod -R 777 /guacamole/drive
chown -R 1000:1000 /guacamole/drive

# Step 7: Restart guacamole-client container
echo "Restarting guacamole-client container..."
docker restart guacamole-client

echo "Setup complete."

