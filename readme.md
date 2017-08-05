# WeatherBuzz

This is a very simple Weather application written in JavaScript/ES6

## Getting Started

Clone the source code repository in a location of your liking. Install the dependencies with 

`yarn install --pure-lockfile`
 
This way `yarn.lock` file will be utilized to ensure you have the correct or most 
stable dependency versions installed.

Alternatively, simply use NPM by running

`npm install`

but there's no `npm-shrinkwrap.json`, so you would be on your own if dependencies fail.

## Building the source

To build the source simply run

`yarn build` or `npm run build`

to build the source in watch mode use

`yarn watch`  or `npm run watch`

## Hosting

Once built, you can serve the application by running 

`yarn serve` or `npm run serve`

and visit `http://127.0.0.7:8080` in your browser.

I recommend taking this for a spin in Chrome for now...

## Testings

To run unit tests, simply run

`yarn test` or `npm run test`