# Cube Solver

Cube Solver is a web-based application that visualizes and interacts with a 3D Rubik's Cube using Three.js on the frontend. The project is structured into a frontend and a backend, with the backend intended for future Node.js development.

## Running the Application

The application is containerized using Docker, making it easy to set up and run. To start the application:

1. Ensure Docker and Docker Compose are installed on your system.

2. Run the following command in the root directory of the project:

```bash
docker-compose up --build -d
```

This command builds and starts the containers in detached mode.

Once the containers are running, access the application via: http://localhost:3000

## Frontend

The frontend is built with Three.js and is responsible for rendering the 3D Rubik's Cube. It is structured with modular 3D models:

- `RubiksCube`: The main 3D model representing the Rubik's Cube.
- `Cube`: Represents a single cube of the Rubik's Cube.
- `Face`: Defines a single face of a cube.

## Backend (Planned)

The backend, intended for future development, will be implemented using Node.js. It will handle computational tasks, API requests, and data management for the Cube Solver application.

## Docker Support

Both the frontend and backend have Docker support. The `docker-compose.yaml` file at the root of the project defines the setup for containerization.

## License

This project is licensed under the [MIT License](LICENSE).
