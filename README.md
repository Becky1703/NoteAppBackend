This repository contains the backend of my final project for the specialization phase

# NoteApp API - Backend for Note Taking Application

Welcome to NoteApp API! This backend API is designed to support note taking apllications like the Kosile note-taking application that I built with React and is available on my GitHub at https://github.com/Becky1703/NoteAppFrontend.git. The API provides CRUD operations for efficient note management within the MERN stack.

## Table of Contents
> Installation
   - Prerequisites
   - Installation Steps
> Usage
   - Example 1: Basic usage
   - Example 2: Basic usage
> Contributing
   - Getting started
   - Contributing Guidelines
   - Pull Request Template
> Related projects

> License

## Prerequisites

Before getting started, ensure you have the following prerequisites:

- Node.js installed. Download and install it from [nodejs.org](https://nodejs.org/).

## Installation Guide

1. Clone the repository:
   ```bash
   git clone https://github.com/Becky1703/NoteAppBackend.git
   ```
2. Navigate to the project directory:
   ```bash   
   cd NoteAppBackend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```  
4. Set up your MongoDB database and update the connection string in `.env` file:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   ``` 
5. Start the server:
   ```bash
   npm run server
   ```
  
## Usage
1. Start the server
To run the application, make sure you have followed the installation guide above. If you have not, please refer to the 'Installation Guide'.

After setting up your environment, naviagate to your project's root directory and execute the following command.

```bash
   npm run server
```
This will start the API in a server and the application will be accessible locally at http://localhost:4000 in your browser or you can change the port to any other port in your .env file.

2. Access the API.
Open your browser and enter the following URL to access the application:
```arduino
http://localhost:4000
```
You should see "message:api is working now".

You can also explore the API documentation at http://localhost:4000/docs for details on available endpoints and how to use them.



## Troubleshooting
One likely issue that might occur while using the application is port conflict. Make sure to check if the port is in use by another application or service. You can do this by running
```bash
sudo lsof -i :<port number>
```
You should also check firewall rules
```bash
sudo ufw status
```
If the port is blocked, make sure you allow the firewall rule for that port
```bash
sudo ufw allow <port number>
```

## Contributing
Pull requests are welcome. For major changes, make sure you follow the following guidelines.

Description: [A brief description of the change]

Justification: [Explain why this change is necessary or beneficial]

Related issues: [List any related issues or pull requests ]

## Related Projects
Explore other projects and resoources related to Note App Api:

A Note App Api made with Go https://github.com/batnoter/batnoter-api.git



## Authors

> Rebecca Adelaja 
  
  email: <oluwabukunmia@gmail.com>
  
  linkedin: <https://www.linkedin.com/in/oluwabukunmi-rebecca-adelaja-725742bb/>

## About Me
I am a lawyer and food business owner turned dedicated software engineer with a fervour for creating meaningful and user-friendly applications. This API is just a precursor to what the future holds, and I'm eagerly anticipating the exciting adventures that technology has in store.

## License
[MIT](https://choosealicense.com/licenses/mit/)