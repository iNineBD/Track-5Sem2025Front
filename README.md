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

## Standardization of git commit
After cloning and installing the dependencies, it is necessary to activate the git commit standardization, file `.pre-commit-config.yaml`, follow with the commands:

```bash
mv .git/hooks/pre-commit.sample .git/hooks/pre-commit.sample.old

pre-commit install --hook-type commit-msg --hook-type pre-commi
```

## Lint to validate the code convention
To check code with indentation and convention, use lint

```bash
npm run prettier:check
```

For automatic correction

```bash
npm run lint:fix
```

## Running the Project
To run the project, execute the following command:

```bash
npm run dev
```

## Accessing the Project
Access the project at [http://localhost:3000/](http://localhost:3000/).


## To unit tests and coverage
To perform unit testing and code coverage, generating a report in the `coverage` directory at the root of the project with `.html`, `.json` and `.info` files that can be used in SonarCloud.

```bash
npm run test:coverage
```

## To integration tests
For integration testing between components, using the Vitest tool.

```bash
npm run test:integration
```