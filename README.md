## Overview 

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

# Features

- [x] View upcoming movies
- [x] View current movies
- [x] Pagenation
- [x] View cast details
- [x] View and write reviews
- [x] Add movie to favourites list
- [x] Search movies
- [x] Add movies to watch list
- [x] Filter movies by genre and language
- [x] Sort movies by various criteria
- [x] Authentication using supabase
- [x] Switch between dark and light theme
- [x] Show similar movies based on the movie being viewed

## Feature Design

#### Login Page

> Requires an email address

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image6.png">
</p>

#### Landing page

> Shows a paginated list of popular movies from the TMDB endpoint

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image2.png">
</p>

#### Upcoming movies page   

> Shows a paginated list of upcoming movies from the TMDB endpoint

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image6.png">
</p>

#### Movie information and cast details

> Clicking on a movie card leads to this page

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image3.png">
</p>


#### Similar movies

> Shows a list of similar movies based on the current movie selected

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image13.png">
</p>

#### Movie reviews

> This page shows reviews of a movie

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image4.png">
</p>

#### Write reviews

> A review form that can be used to write reviews

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image14.png">
</p>

#### Favourite movies page

> Shows the movies that are marked as favourite

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image5.png">
</p>

#### Filtering and sorting

> Allows to filter and sort movies based on a criteria

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image8.png">
</p>


#### Dark mode

> Applies dark theme to all the pages. Image shows dark theme on the landing page

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image7.png">
</p>

#### Account settings

> Show accounts page where the user can update profile details

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image12.png">
</p>

#### Supabase 

> This supabase page shows graphs about request to authentication, storage and datbase

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image9.png">
</p>

> Profiles

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image10.png">
</p>

#### Vercel production deployment

> This page provides information about the recent production deployment, branch, preview and page url

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image11.png">
</p>

#### Storybook

> Used for component development

<p align="center">
  <img width="800" alt="image" src="https://github.com/rukman7/Movie-application/blob/master/images/image15.png">
</p>


## Authentication

| Route  | info |
| ------------- | ------------- |
| /  | Paginated list of movies for the landing page |
| /movies/:id  | Expands to information above a chosen movie  |
| /movies/upcoming | Paginated list of Upcoming movies|
| /account | Logged in User's information |
| /movies/favourites | List of users favourite movies |
| /reviews/:id | Review of a movie| 
| /reviews/form | Page to write a review | 

#### Protected features

All the endpoints are protected which means that only logged in users will be able to access the above mentioned endpoints.

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
