# Task Manager App

This repository contains the code for a Task Manager App, consisting of a backend and a frontend. The application is designed to help users manage their tasks efficiently.

## Coming Up and News!

We are excited to announce some features and news coming up for our App and our company!

### Mobile Update:

Our Team is working hard and fast to be able to deliver Mobile Support and Design as a next Iteration to our App!
We want you to have a great experience on your Browser, either Mac, PC or Mobile Device, and unlock a new level of efficiency in your task handling during the week.

### Website Update:

We are excited to tell you that our website will be coming soon!
You can meet the team, Learn more about Us and contact us for any support and request you may have.

Our goal is to help you unlock a new level of efficiency and facilitating task handling to you.

## Backend

Choosing the right technologies for the backend of our task-manager application was a critical decision, driven by various factors, including the nature of the project and the challenges we anticipated. Here are the reasons for selecting each technology:

### Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Firebase**: Google Cloud-hosted NoSQL database, the perfect choice to scale Document DB based Apps.
- **Axios**: The Promise-based HTTP client loved by us and easy to use and modify.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing to add an extra layer or security.
- **Dotenv**: All our environment variables are in `.env` file.
- **Nodemon**: Used for automatically restarting the server during development.
- **.vscode**: Yes we did! We implemented a Debugger file so you can easy handle backend debug in VS Code.

### Challenges

Setting up the Express.js backend and implementing API and middleware handling presented several challenges. The key challenges included:

- **Express.js Setup**: Configuring Express.js to meet the specific requirements of the task-manager application, including route handling, middleware integration, and error handling.

- **API Development:** Designing and implementing robust APIs that efficiently handle CRUD operations for tasks, ensuring proper validation and error handling.

- **Middleware Handling:** Integrating middleware functions for tasks such as authentication, logging, and CORS to enhance the functionality and security of the backend.

Despite these challenges, the selected technologies have proven to be effective in overcoming them and providing a solid foundation for the task-manager backend. The combination of Node.js, Express.js, TypeScript, Firebase, and other technologies ensures a scalable, maintainable, and efficient backend for our task-manager application.

In the future we are looking for more and better technologies like Sentry for error handling in our backend and others that can help our app become more secure, fast and dynamic at run time and development.

### Getting Started

1. Install dependencies:

   ```bash
   cd backend
   npm install

   ```

2. Create a .env file in the root directory and add your Firebase configuration.

   ```bash
   GCLOUD_PROJECT=<your-project-name>
   FIREBASE_CONFIG=<your-api-key>
   GOOGLE_APPLICATION_CREDENTIALS=<your-sdk-location>

   ```

3. Create a config folder in root directory and add your admin SDK file. Finaly add a firebase-config.json file inside the /src directory and add your credentials from firebase console.

   ```bash
   config
   --SDK File
   task-manager
   --src
   ----.firebase-config.json

   ```

4. Run the development backend server:
   ```bash
   npm start
   ```

## Frontend

In the frontend development of our task-manager application, we carefully selected a set of technologies to create a seamless user interface and ensure efficient state management. Each technology was chosen with specific benefits in mind to enhance development speed, maintainability, and testing capabilities.

### Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: Toolkit for efficient Redux development.
- **Axios**: HTTP client for making request and for API management.
- **Vite**: Fast development server and bundler.
- **TypeScript**: Adds static typing.
- **Jest**: Testing framework supporting Typescript.
- **React Testing Library**: Testing utilities to facilitate test in React components.
- **Tailwind CSS**: Fast packged CSS Library for UI DEvelopment.
- **React DnD**: Fast loading Drag and Drop component API.

### Challenges

The frontend development process presented its own set of challenges, which were successfully addressed during the implementation:

- **Organizing TypeScript Types:** Keeping TypeScript types organized in files for better readability and maintainability was a challenge, just keeping track of them. However, adopting a clear folder structure and using type variables improved the organization.

- **React DnD:** Integrating React DnD in a component and ensuring its reusability across the application posed a challenge. Through careful documentation analysis, component design and abstraction, we achieved a flexible and reusable drag-and-drop component.

- **API Handling with Redux Toolkit:** Creating an API file to handle 'GET,' 'POST,' 'PUT,' and 'DELETE' requests in an easier and dynamic way, and implementing it in our Store Management using Redux Toolkit required thoughtful thinking and design writting to best meet reusable and clean code, plus making we will keep improving it!

Despite these challenges, the selected technologies have proven to be effective in providing a responsive, well tested, and maintainable frontend for our task-manager application. The combination of React, Redux Toolkit, Axios, Vite, TypeScript, Jest, React Testing Library, Tailwind CSS, and React DnD ensures a modern and efficient development workflow that aligns with the project's goals, and it looks amazing!

1. Install dependencies:

   ```bash
   cd task-manager
   npm install
   npm run dev

   ```

1. Running Test with Jest:

   ```bash
   cd task-manager
   npm run test

   ```
