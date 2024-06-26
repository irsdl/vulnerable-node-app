# vulnerable-nodejs-app

A purposefully vulnerable NodeJS and MongoDB application to demonstrate NoSQL Injection techniques.

## Changes from the Original Repo

This fork works with NodeJS version 20 (and higher) and includes additional examples of NoSQL injection.

## Starting the App

### Using Docker (Recommended)

Docker is the simplest way to get the app running. Just run the following commands:

```bash
# If you have not done this previously, clone the repository
git clone https://github.com/irsdl/vulnerable-node-app.git

# Go to the repository directory
cd vulnerable-node-app

# Run the Docker container
docker-compose build
docker-compose up
```

The app will be accessible via `http://[ip]:4000`.

If you want to code your own samples or modify existing ones, you can change the JS files in the `/app` directory, and they will be applied automatically. Most of the paths and logic you will need are in the `/app/routes/` directory.

### Running Locally Without Docker

To run the app locally, first install Ubuntu server in a VM, then install NodeJS version 20 with the following commands:

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

After installing NodeJS version 20 (or higher), initialize the app with (you only need to run this once):

```bash
git clone https://github.com/irsdl/vulnerable-node-app.git
cd vulnerable-node-app/app

npm cache verify
npm install
sudo npm install -g nodemon
```

Then, start the application using:

```bash
npm start
```

The app will be accessible via `http://[ip]:4000`.

## Load / Reset Data

Click on the populate/reset data link on the homepage to load some users. You can also access this directly via: `http://[ip]:4000/reset`.

## Good Learning Links

- [PortSwigger - NoSQL Injection](https://portswigger.net/web-security/nosql-injection)
- [MongoDB NoSQL Injection with Aggregation Pipelines] (https://soroush.me/blog/2024/06/mongodb-nosql-injection-with-aggregation-pipelines/)
- [Websecurify Blog - Hacking NodeJS and MongoDB](https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html)
- [Scotch.io - MongoDB Injection in NodeJS](https://scotch.io/@401/mongodb-injection-in-nodejs)
- [SANS Internet Storm Center - Attacking NoSQL Applications](https://isc.sans.edu/forums/diary/Attacking+NoSQL+applications/21787/)
