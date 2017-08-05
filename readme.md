# WeatherBuzz

This is a very simple Weather application written in JavaScript/ES6

## Demo site
A demo is available on GitHub Pages at

https://sparkbuzz.github.io/weatherbuzz/dist/

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

and visit `http://localhost:3000` in your browser. Do note the URL that BrowserSync outputs, it might be different from
this document.

I recommend taking this for a spin in Chrome for now...

## Testings

To run unit tests, simply run

`yarn test` or `npm run test`

## Notes

The WebPack output bloated, so needs some optimization. This is primarily because the Weather Icons fonts are embedded 
in the bundle, however, time is limited.
