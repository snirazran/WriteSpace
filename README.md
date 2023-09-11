# WriteSpace

Welcome to WriteSpace, a unique social media platform exclusively built for writers. WriteSpace allows writers to pen their thoughts, share their masterpieces, and explore a diverse range of content crafted by other writers, all in a convenient and interactive way.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [API Documentation](#api-documentation)
5. [Getting Started](#getting-started)

## Features

WriteSpace is packed with several features to enhance the experience of its users:

- **Rich Text Editor:** Empowering writers to express their creativity with a myriad of formatting options.
- **Friends System:** Building a community of writers who learn and grow together.
- **Authentication System:** Ensuring security and privacy for all WriteSpace users.
- **Like/Comment System:** Facilitating engagement and sparking insightful discussions.
- **Sharing and Viewing:** Providing a stage for writers to showcase their work and a platform for readers to explore.

## Tech Stack

### Programming Language

- TypeScript

### Frontend

- React
- SWR
- Vite.js
- SASS

### Backend

- Node.js
- Nest.js

### Database

- MongoDB

### Tools

- OpenAPI
- Nx
- Docker

## Architecture

WriteSpace is designed using a **microservices architecture**. This design pattern breaks down the application into smaller, decoupled services which run as independent processes, enhancing modularity and scalability. Each service caters to a specific functionality and can be developed, deployed, and scaled independently.

## API Documentation

The WriteSpace API is documented using **Swagger**. With Swagger's interactive API documentation, developers can understand the API's capabilities without accessing its source code, facilitating easier integration and collaboration. Access the API documentation at:
https://writespace-authservice.fly.dev/authapi,
https://writespace-userservice.fly.dev/api,
https://writespace-projectservice.fly.dev/projectsApi,
https://writespace-documentservice.fly.dev/documentsApi,



## Getting Started

To get started with WriteSpace, you'll need to clone the repository and install dependencies. Here's a basic rundown of what you'll need to do.

**Step 1: Clone the Repository**

\```shell
git clone https://github.com/snirazran/WriteSpace.git
\```

**Step 2: Install Dependencies**

\```shell
npm install
\```

**Step 3: Setup Environment Variables**

Create a .env file, there are ExampleEnv files in each directory that require a .env file.

**Step 4: Run the Application**

\```shell
npm serve
\```
