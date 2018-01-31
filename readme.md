# Diplom

## Setup project

Generate configs for server.
```sh
> npm run config:generate

or

> yarn config:generate
```

Starting server. This command automatically do next tasks:
* Installing dependencies for UI and back-end.
* Building UI and back-end.
* start server.
```sh
> npm start

or

> yarn start
```

Build for UI.
```sh
Production:
> npm run ui

or

> yarn ui

Development:
> npm run ui:watch

or

> yarn ui:watch
```

Build for back-end:
```sh
Production:
> npm run server

or

> yarn server

Development:
> npm run server:watch

or

> yarn server:watch
```

### Created by Artem Tarasov.