# Fast seasonal job

This is the frontend of a web application made for people searching for seasonal jobs. 
This project was created during the 5th year of the Computer Science and management curriculum at Polytech Montpellier.

## How to run locally

### Prerequesities

You must have the following software installed on your computer to be able to run the backend locally

- Docker Compose version at least 2.12.2
- Docker version at least 20.10.21

We recommend using Docker Desktop to make the installation of both software easier.

### Running the project

1. Clone this repository using `git clone https://github.com/MarouanLaroui/iwa-project-front.git`
2. Go into the `iwa-project-front` directory that was created. 
3. Run the command `npm run build`
4. When tue build is finished, run the command `docker-compose --env-file .env up --build`
You are now running the frontend!

## Environment variables

### REACT_APP_IWA_API_URL

The project API url.

## Cloudinary env variables

Documentation :
https://cloudinary.com/documentation/react_integration

### REACT_APP_CLOUDINARY_URL

### REACT_APP_CLOUDINARY_API_KEY

### REACT_APP_CLOUDINARY_CLOUD_NAME

### REACT_APP_CLOUDINARY_API_URL

