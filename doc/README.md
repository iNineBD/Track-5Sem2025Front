# Track-5Sem2025Front - Academic Project for Project Management

This project uses [Nuxt 3](https://nuxt.com/docs/getting-started/introduction), a framework based on Vue.js for modern and efficient web applications. It also integrates Tailwind CSS for styling and follows a modular structure to facilitate development and maintenance.

## 🚀 Setup

Make sure to install the dependencies before starting the project:

```bash
npm install
```

## 🔑 Environment Variables

Before running the project, make sure to configure the `.env` file with the necessary credentials. You can use the `.env.example` file as a template:

```bash
cp .env.example .env
```

Update the values in the `.env` file according to your environment.

## 🛠️ Development Server

To start the development server and test the application locally:

```bash
npm run dev
```

The server will start at http://localhost:3000.

## 🧪 Running Tests

To execute the automated tests, run the following command:

```bash
npm test
```

This will run all unit and integration tests using Vitest.

## 🔐 Login Layout

The project includes a custom layout for the login page. This layout is defined in `layouts/login.vue` and is applied to the login page using the `definePageMeta` function.

## 📦 Production

To generate an optimized version for production:

```bash
npm run build
```

To preview the production version locally:

```bash
npm run preview
```

Refer to the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more details.

## 📁 Project Structure

```bash
Track-5Sem2025Front/
├─ .github/              # GitHub Actions configurations and workflows
│  ├─ workflows/         # Automation files for CI/CD
│  │  └─ main.yml        # Main workflow for continuous integration
├─ .nuxt/                # Automatically generated directory by Nuxt (cache, types, and internal configs)
├─ .output/              # Files generated after the build
├─ assets/               # Static files like images and data
├─ components/           # Reusable Vue components
├─ composables/          # Reusable functions (e.g., data fetching)
├─ doc/                  # Project documentation
│  ├─ README.md          # Main documentation file
├─ layouts/              # Global layouts (e.g., navbar or footer)
├─ node_modules/         # Dependencies installed via npm
├─ pages/                # Project pages (e.g., home or login)
├─ plugins/              # Plugins to extend Nuxt functionalities
├─ public/               # Public files (e.g., favicon or logos)
├─ server/               # Backend API with endpoints in TypeScript
│  ├─ api/
│  │  └─ hello.ts        # Example API endpoint
├─ tests/                # Automated tests (unit and integration)
├─ types/                # TypeScript type definitions
├─ utils/                # Helper functions (e.g., routes or formatting)
├─ .env                  # Environment variables file
├─ .env.example          # Example configuration for environment variables
├─ .gitignore            # File to ignore files/directories in Git
├─ app.config.ts         # Application configurations
├─ app.vue               # Root component of the project
├─ error.vue             # Custom error page
├─ nuxt.config.ts        # Global Nuxt configuration
├─ package-lock.json     # Records the exact versions of dependencies
├─ package.json          # Project configurations and dependencies
├─ README.md             # Project documentation
├─ tailwind.config.ts    # Tailwind CSS configuration
├─ tsconfig.json         # TypeScript configuration
├─ vite.config.ts        # Vite configuration
└─ vitest.config.ts      # Vitest configuration for tests
```

For more details on the Nuxt structure, visit the [directory structure](https://nuxt.com/docs/guide/directory-structure).

## 🌐 Technologies Used

<a href="https://nuxt.com" target="_blank">
    <img src="https://img.shields.io/badge/-Nuxt-black?style=flat-square&logo=nuxt"/>
</a>
<a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/-Typescript-black?style=flat-square&logo=typescript"/>
</a>
<a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/-Tailwind-black?style=flat-square&logo=tailwindcss"/>
</a>
<a href="https://vuejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/-Vue-black?style=flat-square&logo=vue.js"/>
</a>

## 📖 More Information

For more details on Nuxt, visit the [official documentation](https://nuxt.com/docs/getting-started/introduction).
