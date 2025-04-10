const express = require('express');
const app = express();
const path = require('path');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like HTML templates)
app.use(express.static(path.join(__dirname, 'public')));

// Route for home - redirect to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Route for login page
app.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    })
    .post((req, res) => {
        const { username, password } = req.body;
        // Authentication logic
        if (username === "admin" && password === "123") {
            res.redirect('/appointment');
        } else {
            res.status(401).send("Invalid credentials");
        }
    });

// Route for appointment page
app.route('/appointment')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'appointment.html'));
    })
    .post((req, res) => {
        if (req.body.password !== '123') {
            return res.status(401).send("Invalid password");
        }
        const appointmentData = req.body;
        res.send(`Appointment booked: ${JSON.stringify(appointmentData)}`);
    });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});