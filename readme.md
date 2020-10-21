  <p align="center">A Mini Market Data Bank to show Food Market location</p>

<img src="./docs/1.png" />

Haversine formula is used to search for nearest market location. Read more about it [here](https://en.wikipedia.org/wiki/Haversine_formula)

- Live api can be found here [https://market-data-backend.herokuapp.com/api](https://market-data-backend.herokuapp.com/api)
- Live application can be found here [https://market-data-frontend.vercel.app](https://market-data-frontend.vercel.app)


- Users can search by any of market name, category or nearest location
- The base search distance is `25km`. That is, the search algorithm will search for businesses within 25km of the user's location using the Haversine formula

## Installation

```bash
# Install dependencies
$ yarn install

# Copy and rename .env.sample to .env
$ cp .env.sample .env
```

Create Google API key by following the instructions [here](https://developers.google.com/maps/documentation/geocoding/get-api-key)


## Running the app

```bash
# development
$ yarn start:dev
```
App can be accessed via http://localhost:9000 in development environment.
