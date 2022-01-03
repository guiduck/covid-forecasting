# covid-forecasting

### Overview

https://blissful-golick-371b72.netlify.app

This is a covid-19 forecasting app made using NextJS, Typescript, eslint, prettier, Chakra-ui, Chartjs, Brain.js, minmaxscaler and Axios. The app asks for a number of days to predict how the infection rate is gonna be.
I used data obtained from a covid-19 tracker api to feed our ai so it could make somewhat accurate predictions considering just the confirmed cases obtained from the api.

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).

![present](https://github.com/guiduck/covid-forecasting/blob/main/public/images/present.gif)

## Tech Stack
### Devlopment
* UI: [React](https://reactjs.org/)
* State Control: [Context](https://pt-br.reactjs.org/docs/context.html) for global state e [React Hooks](https://reactjs.org/docs/hooks-intro.html) for local state
* Styling: [Chakra-ui](https://chakra-ui.com) 
* HTTP Client: [Axios](https://github.com/axios/axios)
* Icons: [Chakra-ui](https://chakra-ui.com/docs/media-and-icons/icon)
* Charts: [Chart.js](https://www.chartjs.org/docs/latest/)

### API
* [covid tracking](https://api.covidtracking.com)

### Linter
* [Prettier](https://github.com/prettier/prettier)
* [ESLint](https://github.com/eslint/eslint)

## Usage
### Comands

Install dependencies:

```sh
yarn (or npm i)
```

Done! Start the service:

```sh
yarn dev
```

#Development mode

```sh
# run the app in development mode
yarn dev
# next dev starts the application in development mode with hot-code reloading, error reporting, and more.
```
#Production mode

```sh
# When building the Next.js app for production, you'll want to use next build:
next build
# next build creates an optimized production build of your application. The output displays information about each route.

Size – The number of assets downloaded when navigating to the page client-side. The size for each route only includes its dependencies.
First Load JS – The number of assets downloaded when visiting the page from the server. The amount of JS shared by all is shown as a separate metric.

# Followed by either next start, when you want to start the production server:
next start
# next start starts the application in production mode. The application should be compiled with next build first.

# Or next export, when exporting the app as static HTML:
next export
# next export allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server.

# For more information refer to  docs.

For more information refer to * [Next.js CLI](https://nextjs.org/docs/api-reference/cli) docs.
```

## Project Structure

* `src/` code base;
* `src/hooks` config and custom hook for data fetch, used to get the token and messages in this project;
* `src/components` components isolated with its styling (if any);
* `src/context` the QuizContext used for global state control of the quiz related data;
* `src/Pages/` first level router components;

## Screenshots
![preview](https://github.com/guiduck/covid-forecasting/blob/main/public/images/preview.jpeg)
