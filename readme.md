# Live Demo

https://final-project-3-toko-belanja-api-dev-mzca.1.sg-1.fl0.io

You can see documentation from swagger

👇👇👇

[Documentation](https://final-project-3-toko-belanja-api-dev-mzca.1.sg-1.fl0.io/api)

deploy backend from https://www.fl0.com/

serverless postgres database from https://neon.tech/

admin account :

```
 email: admin@gmail.com
 password: admin123
```

# Trying Locally

1. **_create database_**

```
CREATE DATABASE <your database name>
```

2. **_setup `.env`_**

```
DB_URL=
PORT=
SECRET_KEY_JWT=
```

this db format url local
`postgresql://yourusername:yourpassword@localhost:5432/yourdb`

3. **_Migration_**
   Run app locally by command `npm start`, then model migration automatically

```
npm start
```

4. **_Run seeder_**
   Setup config manually here `config/config.json`,

config/config.json

```
{
    "development": {
      "username": "<your database username>",
      "password": "<your database password>",
      "database": "<your database name>",
      "host": "127.0.0.1",
      "dialect": "postgres"
    },
    "test": {
      "username": null,
      "password": null,
      "database": null,
      "host": null,
      "dialect": null
    },
    "production": {
      "username": null,
      "password": null,
      "database": null,
      "host": null,
      "dialect": null
    }
  }
```

End, execute this command

```
npx sequelize db:seed --seed admin
```
