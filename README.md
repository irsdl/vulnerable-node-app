# vulnerable-nodejs-app

A purposely vulnerable NodeJS and MongoDB application

Multiple ways to do NoSQL Injection on Mongo.

## Changes from the original app

This fork works with NodeJS version 20 (and higher?) and includes more examples.

## Starting the app

### Using Docker (Recommended)
Docker is the simplest way to get the app running. Just run the following

```bash
git clone https://github.com/irsdl/vulnerable-node-app.git
cd vulnerable-node-app

docker-compose build
docker-compose up
```

The app is accessible via http://[ip]:4000

If you like to code your own samples or change existing samples to perhaps print some variables, you can change the JS files in the `/app` directory and they will be applied automatically. The paths and logic you are mostly after are in the `/app/routes/` directory.

### Running Locally Without Docker
Install ubuntu server in a VM, then install nodejs version 20 like this:

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

After installing nodejs version 20 (or higher?), here is how you can start the app:

```bash
git clone https://github.com/irsdl/vulnerable-node-app.git
cd vulnerable-node-app/app

npm cache verify
npm install
sudo npm install -g nodemon
````

Then it is possible to start it using:
```bash
npm start
```

The app is accessible via http://[ip]:4000

## Load / Reset Data
Click on the populate / reset data link on the homepage to load in some users. The following link does this:
http://[ip]:4000/reset

## Good learning links
https://portswigger.net/web-security/nosql-injection
https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
https://scotch.io/@401/mongodb-injection-in-nodejs
https://isc.sans.edu/forums/diary/Attacking+NoSQL+applications/21787/