# RolPol Site

## Step by step guide

### Run postgresql service

```bash
sudo service postgresql start   
```

### Log to postgresql shell using `psql`
```bash
psql -U username -W password -h host 
```

### Create database
```sql
CREATE DATABASE oern_db; 
```

### Leave database with `\q`
```sql
\q
```

### Install node package manager
```bash
sudo apt install npm
```

### Clone or download this repository
```bash
git clone https://github.com/kaczor3213/MERN-Practice.git
```
```bash
wget https://github.com/kaczor3213/MERN-Practice/archive/master.zip;
unzip master.zip
```

### Change directory so it you have this content:
```bash
username@host:/home/user/MERN-Practice$ ll
total 4
drwxrwxrwx 1 pm pm 4096 Dec 18 17:13 ./
drwxrwxrwx 1 pm pm 4096 Dec 18 17:24 ../
drwxrwxrwx 1 pm pm 4096 Dec 18 17:08 .git/
-rwxrwxrwx 1 pm pm   80 Dec  8 13:34 .gitignore*
-rwxrwxrwx 1 pm pm  580 Dec 18 17:25 README.md*
-rwxrwxrwx 1 pm pm   32 Dec  8 13:34 _config.yml*
drwxrwxrwx 1 pm pm 4096 Dec  8 13:34 backend/
drwxrwxrwx 1 pm pm 4096 Dec 14 14:23 frontend/
drwxrwxrwx 1 pm pm 4096 Nov 27 14:48 node_modules/
-rwxrwxrwx 1 pm pm 1120 Dec  8 13:34 package.json*
```

### Create database connection config file so your backend has storage:
```bash
username@host:/home/user/MERN-Practice$ cd backend/
username@host:/home/user/MERN-Practice/backend$ touch ormconfig.json
```

### Fill your config file with you database connection data according to example below:
```json
{
   "type": "postgres",
   "host": "database_host",
   "port": 5432,
   "username": "database_username",
   "password": "your_password",
   "database": "oern_db",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```

### Create file with variable necessary to proper hashing of passwords, keep them secret:
```bash
username@host:/home/user/MERN-Practice/backend$ touch .env
```

### Fill it wih those tokens, keep this data secret:
```bash
TOKEN_KEY=secret_token
ADMIN_KEY=secret_admin_token
```

### Install all necessary node packages:
```bash
username@host:/home/user/MERN-Practice/backend$ npm install
```

### Fill your database with records running this script `npm run fill-database`:
```bash
username@host:/home/user/MERN-Practice/backend$ npm run fill-database
```
If any errors occur, check if database connection in `ormconfig.json` is properly configured.

### Run your backend instance running `npm run start`:
```bash
username@host:/home/user/MERN-Practice/backend$ npm run start
```

### In other terminal go to root of the project and go to `frontend/`:
```bash
username@host:/home/user/MERN-Practice$ cd frontend/
username@host:/home/user/MERN-Practice/frontend/$
```

### Then install all packages for frontend `npm install`:
```bash
username@host:/home/user/MERN-Practice/frontend/$ npm install
```

### And finally set off your project running `npm run start`:
```bash
username@host:/home/user/MERN-Practice/frontend/$ npm run start
```

Wait until it opens site in you browser and have fun. If any problem occurs you can email me: `kacz.pacz@gmail.com`

Project is incomplete and has lot of bugs, so don't expect it to flawless.