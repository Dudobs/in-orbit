[Leia isto em Português](README.md)

# 🚀 In Orbit - A Goal Tracker

<div align="center">

  ![Project Origin](https://img.shields.io/badge/Origin-NLW%20Rocketseat-8257E5)
  &nbsp;&nbsp;
  ![License](https://img.shields.io/badge/License-MIT-blue)

</div>

<p align="center">
  <img alt="Preview of the In Orbit project main screen" src=".github/preview.png" width="100%">
</p>

## 🎯 About The Project

**In Orbit** is a full-stack web application for tracking weekly goals, developed during the **NLW (Next Level Week) Pocket Javascript** event, hosted by Rocketseat.

This project was an opportunity to build a complete application from scratch, integrating a robust Node.js back-end with a reactive React front-end. The application allows users to register goals, set a weekly frequency, and track their daily progress through a clean and functional interface.

---

## ✨ Key Features

-   ✅ **Goal Registration:** Allows users to create new goals and set the desired weekly frequency (e.g., 3 times a week).
-   📅 **Daily Tracking:** An interface to mark goals as completed on a specific day.
-   📊 **Progress Visualization:** A general progress bar indicates the percentage of completed goals for the week.
-   📝 **Weekly History:** Displays the goals completed on previous days of the current week.

---

## 🚀 Technologies Used

This project was built with a modern and high-performance stack, separated into two main components: `server` (back-end) and `web` (front-end).

#### **Back-End (Server):**

-   [**Node.js**](https://nodejs.org/en) with [**TypeScript**](https://www.typescriptlang.org/)
-   [**Fastify**](https://www.fastify.io/) as the web framework for building the REST API.
-   [**PostgreSQL**](https://www.postgresql.org/) as the relational database.
-   [**Drizzle ORM**](https://orm.drizzle.team/) for database interaction.
-   [**Zod**](https://zod.dev/) for schema and input data validation.
-   [**Docker**](https://www.docker.com/) for database containerization.

#### **Front-End (Web):**

-   [**React 18**](https://reactjs.org/) and [**Vite**](https://vitejs.dev/) for a fast development foundation.
-   [**TypeScript**](https://www.typescriptlang.org/) for static typing.
-   [**TailwindCSS**](https://tailwindcss.com/) for agile styling.
-   [**Tanstack Query (React Query)**](https://tanstack.com/query/latest) for server-state management.
-   [**React Hook Form**](https://react-hook-form.com/) + [**Zod**](https://zod.dev/) for form handling and validation.
-   [**Biome**](https://biomejs.dev/) as a Linter and Formatter.

---

## ▶️ How to Run The Project Locally

To run this project, you will need **Node.js**, **Docker**, and **WSL (Windows Subsystem for Linux)** (if you are on Windows) installed on your machine.

Follow the steps below:

```bash
# 1. Clone the repository to your machine
$ git clone [https://github.com/your-username/in-orbit.git](https://github.com/your-username/in-orbit.git)

# 2. Access the project folder
$ cd in-orbit
```

### Setting up the Back-End (Server)

```bash
# 3. Enter the server directory
$ cd in-orbit__server

# 4. Install the back-end dependencies
# This command reads the package.json file and downloads all the necessary libraries.
$ npm install

# 5. Start the database with Docker
# Docker Compose will read the docker-compose.yml file and create a container
# with PostgreSQL ready to use. The -d flag runs it in "detached" mode (in the background).
$ docker compose up -d

# 6. Apply the database migrations
# Drizzle Kit will execute the SQL scripts to create the necessary tables in the database.
$ npx drizzle-kit migrate

# 7. Start the back-end server
# This command will start the API, which will be ready to receive requests.
$ npm run dev
```

### Setting up the Front-End (Web)

```bash
# 8. Go back to the root and enter the front-end directory
$ cd ../in-orbit__web

# 9. Install the front-end dependencies
$ npm install

# 10. Start the React application
$ npm run dev
```

Done! You can now access the application at [**http://localhost:5173/**](http://localhost:5173/).

---

## 🧠 Challenges and Learnings

This project was an excellent opportunity to deepen my knowledge of a full-stack workflow. The main learnings were:

-   **Front-End:** It was my first experience using the combination of **React Query**, **React Hook Form**, and **Zod**. The way these libraries integrate to handle server state, forms, and validations in a declarative and safe manner was a game-changer.
-   **Back-End:** The main challenge was to **dockerize** the database environment, ensuring that any developer could get the application running with a single command. Additionally, using **Drizzle ORM** to interact with PostgreSQL in a typed and secure way was a valuable learning experience.

---

## 🎨 Layout

The project's design was provided by Rocketseat and can be viewed through [**this Figma link**](link-to-the-figma-design).

---

## 📝 License

This project is under the MIT License.
