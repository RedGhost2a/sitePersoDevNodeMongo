const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const articleRoutes = require('./_routes/articlesRoutes');
const contactRoutes = require('./_routes/contactRoutes');
const http = require('http');
const setupSocket = require('./_script/socket');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const Article = require('./_models/article');
const Contact = require('./_models/contact');

// We have to tell AdminBro to use mongoose adapter
AdminBro.registerAdapter(AdminBroMongoose)

async function startServer() {
    const app = express();
    const server = http.createServer(app);

    // Configurer le middleware CORS
    app.use(cors());

    // Configurer Socket.IO
    setupSocket(server);

    // Middleware supplémentaires
    app.use(express.json());

    // Connect to MongoDB
    try {
        await connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1); // Stop the server if MongoDB connection fails
    }

    const adminBro = new AdminBro({
        resources: [
            { resource: Article, options: { /* Resource options */ } },
            { resource: Contact, options: { /* Resource options */ } },
        ],
        rootPath: '/admin',
        // Add basic authentication
        loginPath: '/admin/login',
    });

    const ADMIN = {
        email: 'red',
        password: 'password',
    }

    const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
        cookiePassword: 'session-key',
        authenticate: async (email, password) => {
            if (ADMIN.email === email && ADMIN.password === password) {
                return ADMIN;
            }
            return null;
        },
    }, null, {
        resave: false,
        saveUninitialized: true,
    });

    // Use AdminBro routes
    app.use(adminBro.options.rootPath, router);

    // Routes
    app.use('/articles', articleRoutes);
    app.use('/contact', contactRoutes);

    // Start the server
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1); // Stop the server if any error occurs during startup
});
