# NCSUMicroservice

This project contains the frontend for the NCSUMicroservice application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker: Ensure you have Docker installed on your local machine. You can download it from [here](https://www.docker.com/get-started).

### Running the Application

To run the application, follow these steps:

```bash
# Clone the repository to your local machine:
git clone https://github.com/your-username/NCSUMicroservice.git

# Navigate to the project directory:
cd NCSUMicroservice

# Build the Docker image:
docker build -t my-frontend-app .

# Run the Docker container:
docker run -p 3000:80 my-frontend-app
