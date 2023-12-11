# Stage 1: Build the JAR
FROM maven:3.8.4-openjdk-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files and build the application
COPY pom.xml .
COPY src ./src
RUN mvn clean install

# Stage 2: Create a lightweight image with the JAR
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/jambo-0.0.1-SNAPSHOT.jar .

# Specify the command to run on container start
CMD ["java", "-jar", "./jambo-0.0.1-SNAPSHOT.jar"]
