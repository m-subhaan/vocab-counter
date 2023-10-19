This repository contains the codebase for both the frontend and backend of our application. The frontend is built using React, and the backend is a Serverless application.

## 📂 Structure

- **frontend/**: This directory contains the React-based frontend application.
- **backend/**: This directory contains the Serverless (Node.js) backend application.
- **deploy.sh**: A shell script to automate the deployment process. It deploys the backend, extracts the endpoint URL, and sets it in the frontend's `.env` file.

## 🚀 Getting Started

### Prerequisites

- Ensure you have Node.js and npm installed.
- Install the Serverless framework globally: 
    ```bash
    npm install -g serverless
## Deployment

#### Set Up
Clone the repository and navigate into it:
```bash
    git clone [repository-url] cd [repository-name]
 ```
 #### Run the Shell Script
This script handles the deployment of both the frontend and backend. Additionally, it sets the backend's endpoint URL in the frontend's environment.

```bash
./deploy.sh
```
Ensure you have the necessary permissions to execute the script:
```
chmod +x deploy.sh
```

## Development

#### Frontend
Navigate to the frontend directory, install dependencies, and start the development server:
```
cd frontend npm install npm start
```
#### Backend
Navigate to the backend directory and install dependencies:
```
cd backend npm install
```
To test the Serverless functions locally, use:
```
serverless invoke local --function [function-name]
```
