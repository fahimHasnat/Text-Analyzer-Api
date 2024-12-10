# Task Analyzer - Backend

This guide will walk you through setting up the backend of the Task Analyzer project.

## Prerequisites

Before setting up the backend, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: npm comes bundled with Node.js, so installing Node.js will also install npm.

## Installation

### 1. Install NestJS CLI

To get started, you'll need to install the NestJS CLI globally on your system. Run the following command:

```
npm install -g @nestjs/cli
```
### 2. Install Project Dependencies
Once the NestJS CLI is installed, navigate to the project directory and install the necessary dependencies by running:

```bash
npm install
```
### 3. Configure Environment Variables
The env is provided with the code since I have used a database server, rather than a local db.

### 4. Run the Development Server
```
npm run start:dev
```

This will start the NestJS development server and make the API accessible at ```http://localhost:8001```.





