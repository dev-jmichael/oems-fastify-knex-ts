#!/bin/bash

# Name and tag for your Docker image
IMAGE_NAME="oems-fastify"
IMAGE_TAG="tag"

# Path to your Dockerfile (current directory in this case)
DOCKERFILE_PATH="."

# Port mapping (host_port:container_port)
PORT_MAPPING="3000:3000"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME:$IMAGE_TAG $DOCKERFILE_PATH

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Docker image build failed"
    exit 1
fi

# Run the Docker container
echo "Running Docker container..."
docker run -p $PORT_MAPPING $IMAGE_NAME:$IMAGE_TAG
