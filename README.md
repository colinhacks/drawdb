## DrawDB

Download the app with `degit`.

```bash
npx degit colinhacks/drawdb drawdb
```

Alternatively, download the `incomplete` branch for a version that doesn't have persistence implemented.

```bash
npx degit colinhacks/drawdb#incomplete drawdb
```

Then install dependencies, initialize the EdgeDB project, generate the query builder, and run the application.

```bash
cd drawdb
yarn
edgedb project init
npx edgeql-js
yarn dev
```
