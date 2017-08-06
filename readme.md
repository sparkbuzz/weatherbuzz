# WeatherBuzz

[![Build Status](https://travis-ci.org/sparkbuzz/weatherbuzz.svg?branch=master)](https://travis-ci.org/sparkbuzz/weatherbuzz)

WeatherBuzz is a very simple Weather application written in JavaScript/ES6. It utilises the OpenWeatherMap API to 
fetch weather data in the user's location. See more at 
http://openweathermap.org/api

## Demo Site
Note that the project contains a `./dist` folder. This is intentional to allow serving the latest build by using GitHub
Pages.

The online demo is available on GitHub Pages at
https://sparkbuzz.github.io/weatherbuzz/dist/

## Getting Started

Clone the source code repository in a location of your liking. Install the dependencies with 

`$> yarn install --pure-lockfile`
 
Using Yarn ensures the `yarn.lock` file will be utilised to ensure you have the correct or most stable dependency 
versions installed. The installation also runs significantly faster than with NPM < v5.x.x 

You can also install with NPM by running

`$> npm install`

but there's no `npm-shrinkwrap.json`, so you're on your own if dependencies fail.

## Building the Source

WeatherBuzz uses WebPack 3 to perform builds. To build the source simply run

`$> yarn build` or `$> npm run build`

to build the source in watch mode use

`$> yarn watch`  or `$> npm run watch`

## Starting the Server

Once built, you can serve the application with BrowserSync over HTTPS by running 

`$> yarn serve` or `$> npm run serve`

and visit `http://localhost:3000` in your browser. Do note the URL that BrowserSync outputs, it might be different from
what this document states.

I recommend taking the ap for a spin in Chrome for now, as no cross browser testing has been done yet due to the time 
factor.

## Testing the Project

CI tests can be seen on Travis CI at 
https://travis-ci.org/sparkbuzz/weatherbuzz

To run the unit test suite locally, simply run

`$> yarn test` or `$> npm run test`

Karma tests are executed in Firefox to make it easier to execute on Travis CI.

## Future Improvements

The generated WebPack bundle is bloated, so needs some optimization. This is primarily because the Weather Icons fonts 
are embedded in the bundle, however, time is limited.

The project doesn't include any code coverage, so would be a nice future addition.

Not all the code is covered with tests, the idea is to simply demonstrate some general concepts.
