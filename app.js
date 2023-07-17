// Import required modules
const express = require('express'); // Import Express framework
const app = express(); // Create an instance of Express
const port = 3003; // Specify the port number
const middleware = require('./middleware'); // Import custom middleware
const path = require('path'); // Import Node.js path module
const bodyParser = require("body-parser"); // Import body-parser middleware
const mongoose = require("./database"); // Import Mongoose database connection
const session = require("express-session"); // Import express-session middleware

// Start the server and listen on the specified port
const server = app.listen(port, () => console.log("Server listening on port " + port));

// Set up view engine and views directory
app.set("view engine", "pug"); // Set the view engine to Pug
app.set("views", "views"); // Set the directory for views

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

app.use(session({
    secret: "shadow", // Secret used to sign the session ID cookie
    resave: true, // Forces the session to be saved back to the session store, even if it wasn't modified during the request
    saveUninitialized: false // Prevents the session from being saved to the session store until a property is set
}));

// Routes
const loginRoute = require('./routes/loginRoutes'); // Import login route module
const registerRoute = require('./routes/registerRoutes'); // Import register route module
const logoutRoute = require('./routes/logoutRoutes'); // Import logout route module

//Api Routes
const postsApiRoute = require('./routes/api/posts');

app.use("/login", loginRoute); // Mount the login route at /login
app.use("/register", registerRoute); // Mount the register route at /register
app.use("/logout", logoutRoute); // Mount the logout route at /logout

app.use("/api/posts", postsApiRoute); // Mount the Api route at /api/posts

// Home route
app.get("/", middleware.requireLogin, (req, res, next) => {
    // Render the home view with appropriate data
    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user // Pass the user session data to the view
    }

    res.status(200).render("home", payload); // Render the home view with the provided payload
});
