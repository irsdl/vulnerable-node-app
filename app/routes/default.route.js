const express = require('express');
const app = express();
const defaultRoutes = express.Router();

let User = require('../models/User');
let Config = require('../models/Config');
let Product = require('../models/Product');

defaultRoutes.route('/').get(function(req, res) {
    res.render('index', {
        title: 'Home',
        message: 'A Vulnerable Node & Mongo App'
    })
});

defaultRoutes.route('/reset').get(async function(req, res) {
    const db = req.app.locals.db;

    if (!db) {
        console.error("Database connection is not set up correctly.");
        return res.render('reset', {
            title: 'Reset DB',
            message: 'Database connection error.'
        });
    }

    const dropAllCollections = async () => {
        try {
            const collections = await db.listCollections().toArray();
            console.log("Collections found:", collections.length);

            for (const collection of collections) {
                console.log("Found collection:", collection.name);
                if (!['configs', 'products', 'users'].includes(collection.name)) {
                    await db.dropCollection(collection.name);
                    console.log(`Collection ${collection.name} has been dropped.`);
                }
            }
        } catch (err) {
            console.error("Error dropping collections:", err);
            throw err;
        }
    };

    try {
        await dropAllCollections();
    } catch (err) {
        res.render('reset', {
            title: 'Reset DB',
            message: 'Error has occurred during the reset process.'
        });
        console.error(err);
        return;
    }

    try {
        await Config.deleteMany({});
        console.log("Configs have been removed.");
        await Product.deleteMany({});
        console.log("Products have been removed.");
        await User.deleteMany({});
        console.log("Users have been removed.");

        let users = [
            {
                username: "guest",
                password: "password",
                first_name: "",
                last_name: "",
                role: "guest",
                email: "guest@nullsweep.com",
                locked: false,
                resetPasswordToken: ""
            },
            {
                username: "admin",
                password: "2TR6uTRAuMUr5vARs9fYgdqY",
                first_name: "",
                last_name: "",
                role: "admin",
                email: "admin@nullsweep.com",
                locked: false,
                resetPasswordToken: "swrtwaqqq225q222122112"
            },
            {
                username: "carlos",
                password: "abc123",
                first_name: "Scary",
                last_name: "Ghost",
                role: "user",
                email: "ghost@mailinator.com",
                locked: true,
                resetPasswordToken: "iioldsgiaioaiejiejirj0ifgsi"
            },
            {
                username: "jsmith",
                password: "SuPeRsEcR3T",
                first_name: "John",
                last_name: "Smoth",
                role: "user",
                email: "jsmith@gmail.com",
                locked: false,
                resetPasswordToken: ""
            },
            {
                username: "angryPrism58736",
                password: "L1g7tM3Up!",
                first_name: "Gary",
                last_name: "Jorgen",
                role: "user",
                email: "prismman@yahoo.com",
                locked: false,
                resetPasswordToken: "kmkkqjneufouigfjaiuef"
            }
        ];

        for (let user of users) {
            let u = new User(user);
            await u.save();
            console.log("added user " + u.username);
        }

        let configs = [
            {
                name: "apiClientKey",
                value: "myclientname"
            },
            {
                name: "apiSecretKey",
                value: "S3cr3tIsHERE!"
            },
            {
                name: "internalName",
                value: "internetsecret.local"
            }
        ];

        for (let config of configs) {
            let c = new Config(config);
            await c.save();
            console.log("added config " + c.name);
        }

        let products = [
            {
                name: "Apple Juice",
                category: "soft",
                released: true,
                quantity: 30
            },
            {
                name: "Orange Juice",
                category: "soft",
                released: true,
                quantity: 100
            },
            {
                name: "Coke",
                category: "fizzy",
                released: true,
                quantity: 50
            },
            {
                name: "Golden Bear",
                category: "alcohol",
                released: false,
                quantity: 1
            }
        ];

        for (let product of products) {
            let p = new Product(product);
            await p.save();
            console.log("added product " + p.name);
        }

        res.render('reset', {
            title: 'Reset DB',
            message: 'Added ' + users.length + ' users, and ' + configs.length + ' configs, and ' + products.length + ' products.'
        });
    } catch (err) {
        res.render('reset', {
            title: 'Reset DB',
            message: 'Error has occurred'
        });
        console.error(err);
    }
});

module.exports = defaultRoutes;