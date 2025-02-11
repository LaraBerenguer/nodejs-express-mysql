# A React + Nodejs app to find your local game tables

## 📄 Description

Hi! This is a full-stack web application for scheduling and managing tabletop gaming sessions. You can create users, events, manage locations, and coordinate with other players. Auth/login is coming soon!

I built the app with React + Vite. Frontend includes state management using Context API. Backend includes Nodejs, express and database management with Sequelize and Postgresql.

Check it live here: [https://findgames-three.vercel.app/](https://findgames-three.vercel.app/)

## 💻 Technologies Used

### Frontend
- React with TypeScript
- Vite
- TailwindCSS
- DaisyUI
- FullCalendar
- Chart.js
- Mapbox GL

### Backend
- Node.js with Express
- Sequelize ORM
- PostgreSQL
- CORS

## 💡 Functionalities

- [x] Calendar management: Create, edit and visualize gaming events with an interactive calendar view
- [x] Location map: Track gaming locations on an interactive map with filters by type
- [x] Event scheduling: Schedule gaming sessions with date, time, location and player assignments
- [x] Event analytics: Check statistics about game frequency and locations
- [x] Real-time updates
- [ ] Login and Auth
- [ ] Unit testing

## ℹ️​ Some important comments!

I made this app to work locally with MYSQL. Some code is commented and you can make it work with your own local mysql database.

For production, I changed to Postgresql, so rigth now you need a postgresql database to make it work. Sequelize will create your database if you have postgre.

You can also ignore this and check the live version in the description for easy access!

## 🔑 Setting up .env configuration

To run this project locally, you need to configure environment variables. Follow these steps:

You'll need:
- A Mapbox key. Get yours at [Mapbox official site](https://www.mapbox.com/)
- A local database.

1. Create and .env in the Frontend directory with this content:

```bash
VITE_MAP_TOKEN:your_mapbox_key
VITE_API_URL:your_preferred_localhost_example_http://localhost:3000
```

2. Create an .env in the Backend directory and add this:

```bash
PORT:your_local_port_example_3000
DB_PASS:your_db_password
DATABASE_URL:your_backend_url
...
```
3. After setting up the .env file with your own credentials, you’ll be ready to run the project.

## 📋 Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 13

## 🚀 Installation

**✔️ Step 1:** Clone the repository to your local machine (replace `your-username` with your GitHub username):

```bash
git clone https://github.com/your-username/nodejs-express-mysql.git
cd nodejs-express-mysql
```

**✔️ Step 2:** Install backend dependencies:

```bash
cd backend
npm install
```

**✔️ Step 3:** Install frontend dependencies:

```bash
cd frontend
npm install
```

**✔️ Step 4:** Setup the database:

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE findgames;
\q

# Import database schema
psql -U postgres findgames < common/pbackup.sql
```

**✔️ Step 5:** Start the development servers:

Terminal 1 (Backend):

```bash
cd backend
tsc --watch
```

Terminal 2 (Backend):

```bash
cd backend
node dist/index.js
```

Terminal 3 (Frontend):

```bash
cd frontend
npm run dev
```
Once the server is running, you'll see a URL similar to:

```bash
 > Local: http://localhost:5173/
```

## 🤝 Contributions
If you want to contribute or report issues, feel free to create an issue or submit a pull request.