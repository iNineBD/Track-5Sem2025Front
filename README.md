# Track-5Sem2025Front

Repository intended for the implementation of an academic project in partnership with a real company.

## About the Project

This front-end project is being developed using Nuxt 3, a modern framework based on Vue.js. It provides an efficient and modular interface for managing project data. The application integrates Tailwind CSS for styling and offers a seamless user experience.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Cloning the Repository

Clone this repository using the following commands:

```bash
git clone https://github.com/your-repo/Track-5Sem2025Front.git
cd Track-5Sem2025Front
```

## Setting Up Environment Variables

Before running the project, create a `.env` file in the root directory. Use the `.env.example` file as a template:

```bash
cp .env.example .env
```

In the `.env` file, configure the `API_SERVER` variable with the URL of the API server:

```
API_SERVER=url_api_server
```

## Installing Dependencies

Install the project dependencies with the command:

```bash
npm install
```

## Running the Project
To run the project, execute the following command:

```bash
npm run dev
```

## Accessing the Project
Access the project at [http://localhost:3000/](http://localhost:3000/).


## To test and evaluate code coverage

To generate test coverage (report for Sonar or visualization):

```bash
npm run test:coverage
```

After the ```test:coverage``` command, you can open the ```index.html``` to be able to evaluate locally through the browser the code coverage and tests executed.

- Windows:

```bash
start coverage/lcov-report/index.html
```

- Linux:

```bash
xdg-open coverage/lcov-report/index.html
```