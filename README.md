# AUTH_APP

This app is to setup auth flow using postgres database

---

## 1. To use .env config

### Steps:

#### 1.1: Install Nest Config

`yarn add @nestjs/config`

  <br>

### 1.2: Add Import to app.module.ts

`import { ConfigModule } from '@nestjs/config';`

#### 1.2: Add following code to app.module.ts imports array

`ConfigModule.forRoot({ isGlobal: true })`
<br>

#### 1.3: Create `.env` file in project root folder and add required config

  <br>

#### 1.4: Add following code to main.ts</h2>

```javascript
// Add these line after app variable declarations
const config: ConfigService = app.get(ConfigService);
const port: number = config.get < number > 'PORT';
```

---

## 2. Setting up class validators and transformers for requests

### Steps:

#### 2.1: Install Dependencies

`yarn add class-validator class-transformer`

  <br/>

#### Step 2.2: Add Following Code To main.ts

```javascript
// Add validation pipe import
import { ValidationPipe } from '@nestjs/common';

// Add these line after app variable declarations
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }),
);
```

----

## 3. Database Connection

### Steps

#### 3.1: Install Following Dependecies

`yarn add @nestjs/typeorm pg typeorm`

  <br/>

#### 3.2: Add following config in `.env` file for Postgres

```env
# DATABASE CONFIG
DATABASE_PORT=5432
DATABASE_HOST='localhost'
DATABASE_PASSWORD='postgres'
DATABASE_USERNAME='postgres'
DATABASE_NAME='new_auth_app'
```

  <br/>

#### 3.3: Add following code to `package.json` scripts

```json
  "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js ",
  "migration": "yarn run build && yarn run typeorm -d ./src/shared/config/database.config.ts  migration:run",
  "migration:generate": "yarn run typeorm migration:generate ./shared/database/migrations/",
  "migration:create": "yarn run typeorm migration:create",
  "revert-migration": "yarn run typeorm migration:revert",
  "create-entity": "yarn run typeorm entity:create"
```

  <br/>

#### 3.4: Create new file to `src/config/database.config.ts` and add following code

```typescript
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { entities } from '../database/entities/index';

ConfigModule.forRoot();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/entities/*.entity{js,ts}', ...entities],
  migrations: ['dist/**/migrations/*.{js,ts}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'file',
  synchronize: false, // never use TRUE in production!
  // migrationsRun: true
});
```

  <br/>

#### 3.5: To connect database add following code to module where we want to use database

For this project refer `database.module.ts` for entity creation and use and also check ``auth.module.ts` for connecting to database .

<br/>

----

## 4. Setting up path aliases

[Refence doc link](https://javascript.plainenglish.io/a-simple-way-to-use-path-aliases-in-nestjs-ab0db1be1545)

#### 4.1 Add paths property in `tsconfig.json`

```json
"paths": {
  "@/*": ["src/*"],
}
```
<br/>

----
## 5. Adding JWT Auth
[Introduction to JWT, access token, refresh token](https://www.c-sharpcorner.com/article/accesstoken-vs-id-token-vs-refresh-token-what-whywhen/#:~:text=Access%20token%20used%20in%20token,which%20must%20be%20a%20JWT.)

[Reference Doc](https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token)
[Role Based JWT Auth Reference Doc](https://shpota.com/2022/07/16/role-based-authorization-with-jwt-using-nestjs.html)

<br/>

### Steps
#### 5.1: Add required dependencies
```json
  yarn add @nestjs/jwt @nestjs/passport passport-jwt passport
  yarn add -D @types/passport-jwt @types/node
  yarn add bacrypt
```

----