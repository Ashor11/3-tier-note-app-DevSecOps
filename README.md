# Ashour To Do List App

A simple to-do list application with a 3-tier architecture:
- Frontend: React
- Backend: Flask
- Database: PostgreSQL

## Building and Running with Docker

1. Build the Docker images:
```
docker build -t ashour-todo-frontend -f src/feedback_frontend/src/Dockerfile .
docker build -t ashour-todo-backend -f src/feedback_backend/Dockerfile .
```

2. Run the containers:
```
docker-compose up
```

## Features
- Add tasks and notes
- View list of tasks
- Delete tasks
- Clean and simple interface with header and footer

## Architecture
This app maintains compatibility with the original feedback app structure and can be deployed using the same Docker and Kubernetes configurations.