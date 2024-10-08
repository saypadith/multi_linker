
# MultiLinker Application

This is a URL redirection application developed using **Node.js** (v18), **Firebase Firestore**, and **Docker**. The application creates and stores short links in Firestore and redirects users based on their platform (Android, iOS, or desktop) when they access the short link. The application also logs the creation time and status of each short link.

## Features

- Create short links for Android, iOS, and desktop platforms.
- Redirect users based on the platform they are using.
- Store short link data, including URLs, status, and creation time, in Firebase Firestore.
- Dockerized for easy deployment.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing the API](#testing-the-api)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js (v18)](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- A [Firebase Project](https://firebase.google.com/) with Firestore enabled.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/saypadith/multi_linker.git
   cd multi_linker
   ```

2. **Install dependencies:**

   If you want to run the application locally without Docker, install the dependencies:

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable Firestore for the project.
   - Create a Firestore database collection called `redirects` to store short link data.

4. **Configure Firebase:**

   Create a `.env` file in the project root with your Firebase credentials. These can be found in your Firebase project's settings.

   ```bash
   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   FIREBASE_APP_ID=your-firebase-app-id
   ```

## Environment Variables

Make sure your environment variables are configured in the `.env` file. 

## Running the Application

### Running with Docker

The application is fully Dockerized for easy deployment. Follow these steps to run the application using Docker:

1. **Build the Docker image and start the container:**

   ```bash
   docker-compose up --build
   ```

2. **Access the application:**

   The application will be accessible on `http://localhost:8080`.

### Running Locally

If you prefer running the app locally without Docker, follow these steps:

1. **Start the application:**

   ```bash
   npm start
   ```

2. **Access the application:**

   Open `http://localhost:8080` in your browser.

## Testing the API

### Create a Short Link

You can create a short link by sending a `POST` request to `/redirect` with the following JSON body:

```json
{
  "shortId": "abc123",
  "androidURL": "https://play.google.com/store/apps/details?id=com.example.app",
  "iosURL": "https://apps.apple.com/us/app/example/id123456789",
  "desktopURL": "https://example.com",
  "status": "active"
}
```

**Example using `curl`:**

```bash
curl -X POST http://localhost:8080/redirect   -H "Content-Type: application/json"   -d '{
    "shortId": "abc123",
    "androidURL": "https://play.google.com/store/apps/details?id=com.example.app",
    "iosURL": "https://apps.apple.com/us/app/example/id123456789",
    "desktopURL": "https://example.com",
    "status": "active"
  }'
```

### Access the Short Link

You can access a short link by making a `GET` request to `/redirect/:shortId`.

Example:

```bash
curl -X GET http://localhost:8080/redirect/abc123
```

The user will be redirected to the appropriate platform based on their user-agent (Android, iOS, or desktop).

## Project Structure

```plaintext
project-root/
│
├── src/
│   ├── controllers/
│   │   └── redirectController.js
│   ├── firebase/
│   │   └── firebase.js
│   ├── models/
│   │   └── redirectModel.js
│   ├── routes/
│   │   └── redirectRoutes.js
│   ├── app.js
│   └── config.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .env
└── README.md
```

## Usage

1. **Create short links:** Use the API to create short links for different platforms (Android, iOS, and desktop).
2. **Redirect users:** Users will be automatically redirected based on their platform.
3. **Manage links:** You can manage the status of each short link by updating the `status` field (active/inactive) in Firestore.

## License

This project is licensed under the MIT License.
