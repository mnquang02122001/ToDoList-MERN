# To do list

A full-stack pet project

## Live demo

https://todolist-frontend-1a3k.onrender.com

## Features

- CRUD tasks

## Tech Stack

**Client:** React, Typescript, Bootstrap 5

**Server:** Node, Express, Typescript

**Database:** Mongodb

## Installation

Clone this repository

```bash
git clone https://github.com/mnquang02122001/ToDoList-MERN
```

## Run Locally

Run back-end dev server from root directory:

```bash
  cd backend
  npm install
  npm run build
  npm start
```

Run front-end dev server from root directory:

```bash
  cd frontend
  npm install
  npm start
```

## Run with docker

```bash
  docker-compose build
  docker-compose up -d
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in backend

`SERVER_PORT`
`MONGO_USERNAME`
`MONGO_PASSWORD`
`NODE_ENV`

.env file in frontend

`PORT`
`REACT_APP_SERVER_BASE_URL`
