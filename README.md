# vulnerable-nodejs-app

A purposely vulnerable NodeJS and MongoDB application

Multiple ways to do NoSQL Injection on Mongo.

## Changes from the original app

This should now work with NodeJS version 20 and should also include more examples.

Here is how I used it locally in Ubuntu:

## Starting the app

### Using Docker
Docker is the simplest way to get the app running. Just run the following

```bash
docker-compose build
docker-compose up
```

navigate to http://localhost:4000

### Installing nodejs v20:
If you want to run it locally, nodejs v20 is required.
```bash
# Remove the Conflicting Package
sudo apt-get remove --purge libnode-dev
# Add NodeSource Repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
# Install Node.js
sudo apt-get install -y nodejs
# Verify Installation
node -v
npm -v
```

### Running the app locally:
After installing nodejs v20, here is how it can be cloned & run:
```bash
git clone https://github.com/irsdl/vulnerable-node-app.git
cd vulnerable-node-app/app
npm cache verify
npm install
sudo npm install -g nodemon
````

Then it is possible to start it using:
```
npm start
```

Navigate to http://localhost:4000

### Load data
Click on the populate / reset data link on the homepage to load in some users.

## Good learning links
https://portswigger.net/web-security/nosql-injection
https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
https://scotch.io/@401/mongodb-injection-in-nodejs
https://isc.sans.edu/forums/diary/Attacking+NoSQL+applications/21787/