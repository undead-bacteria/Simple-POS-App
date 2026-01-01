# Simplified POS System (Microservices with RabbitMQ)

## Overview

This project is a modern, event-driven Point of Sale (POS) system built using a microservices architecture. It demonstrates how independently deployable services can communicate reliably using RabbitMQ while persisting data in MongoDB.

The system consists of two core services:

Order Service – Accepts customer orders and publishes order events.
Inventory Service – Consumes order events asynchronously and updates product stock levels.

All services are fully containerized with Docker and orchestrated using Docker Compose, making the system easy to run locally and extend for production use.

## Key Features

1. Order Service

-> REST API for order creation and retrieval
-> Publishes order events to RabbitMQ
-> Stores order data in MongoDB

2. Inventory Service

-> Subscribes to RabbitMQ order events
-> Updates product stock atomically
-> Exposes inventory query endpoints

3. Messaging (RabbitMQ)

-> Reliable message delivery
-> Decouples order processing from inventory updates
-> Enables horizontal scalability

4. Containerization

-> Fully Dockerized services
-> One-command startup using Docker Compose

## Tech Stack

Backend: Node.js, Express.js
Database: MongoDB
Message Queue: RabbitMQ (amqplib)
Containerization: Docker, Docker Compose

## Getting Started

# Prerequisites

Docker
Docker Compose

1. Clone the Repository
   git clone https://github.com/yourusername/simple-pos-project.git
   cd simple-pos-project

2. Build and Start the System
   docker-compose up --build

# Service Endpoints

# Service -> URL

Order Service -> http://localhost:3000
Inventory Service -> http://localhost:3001
RabbitMQ Dashboard -> http://localhost:15672

## RabbitMQ Credentials

Username: guest
Password: guest

## API Usage

1. Create an Order
   curl -X POST http://localhost:3000/orders \
    -H "Content-Type: application/json" \
    -d '{"productId":"123", "quantity":2}'

2. Retrieve Orders
   curl http://localhost:3000/orders

3. Check Inventory Stock
   curl http://localhost:3001/inventory/123
