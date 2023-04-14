# Movie Tracker

Demo: movie-application-tau.vercel.app

> This project is a SPA front-end React application. You can use it to discover the latest movies and get more information on them. If you have a [TMDb](https://www.themoviedb.org/) account, you can login with that account in this app to rate movies, add them to your favorites list.

It uses:

- **React**: as the main UI library
- **React Router**: for routing
- **Material UI**: for React components that implement Material Design
- **Axios**: for making API requests to TMDb
- **Supabase**: for authentication
- **Vercel**: for deployment
- **TMDB APIs**: for fetching all information related to movies
- **Storybook**: for documenting and developing React components
- **Reactquery**: for caching API calls

## Features

- [x] View upcoming movies
- [x] View current movies
- [x] Pagenation
- [x] View cast details
- [x] View actor information
- [x] View and write reviews
- [x] Add movie to favourites list
- [x] Search movies
- [x] Add movies to watch list
- [x] Filter movies by genre and language
- [x] Sort movies by various criteria
- [x] Authentication using supabase
- [x] Switch between dark and light theme
- [x] Show similar movies based on the movie being viewed

## Installation

**Clone the repo:**

```bash
git clone https://github.com/rukman7/Movie-application.git
cd Movie-application
```

**Install the dependencies:**

```bash
npm install
```

**Set the environment variables:**

Create a `.env` file which includes all your secret environment variables.

This project needs the following environment variables:

```bash
VITE_TMDB_KEY=<INSERT TMDB API KEY HERE>
VITE_SUPABASE_URL=<INSERT SUPABASE URL HERE>
VITE_SUPABASE_ANON_KEY=<INSERT SUPABASE ANON KEY HERE>
```

To get a TMDb API key, visit https://www.themoviedb.org/documentation/api

To create a supabase account, visit https://supabase.com

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.