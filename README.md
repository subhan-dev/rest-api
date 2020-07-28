# rest-api
REST API Task Ethis.

### REST api
List of routes:

| Route                 | HTTP    | Descriptions                                    |
| :-------------------- | :------ | :---------------------------------------------- |
| `/signup`             | POST    | Create a user input: name, email, password      |
| `/signin`             | GET     | Sign in to get token input: email, password     |
| `/read`               | GET     | Get all the users required token                |
| `/read/:id`           | GET     | Get a single user required token                |
| `/update/:id`         | PATCH   | Update a user with specific info required token |
| `/delete/:id`         | DELETE  | Delete a user required token                    |
| `/pdf`                | POST    | Send pdf to third party api input: name, email  |
| `/uuid`               | GET     | Create UUID                                     |
| `/load?size="{size}"` | GET     | Get users with limit default size = 3           |
| `/curl`               | GET     | Get data provinsi from api raja ongkir          |

run CronJob with node-schedule => in app.js uncomment line 30 cronJob(). example: send pdf to third party api every 10 second

---
### Usage
```
- create db
- configurasi db => config/config.json
- install dependencies => npm install
- migration db => npx sequelize-cli db:migrate
- run => npm start
- run with nodemon => npm run dev

```
### Tools
```
- VS code editor
- Postman for testing api
- MySQL Workbench

```

Access the website http://localhost:3000