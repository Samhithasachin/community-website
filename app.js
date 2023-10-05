
// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const ejs = require('ejs');

// const app = express();
// const port = 3000;

// // Create a MySQL database connection
// const db = mysql.createConnection({
//   host: '162.241.252.224',
//   user: 'mijohhmy',
//   password: 'Pass,1234',
//   database: 'mijohhmy_phytolabcommunity'
// });


// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

// // Middleware for parsing JSON data
// app.use(bodyParser.json());

// // Set the view engine to EJS
// app.set('view engine', 'ejs');

// // Serve static files (CSS, JavaScript)
// app.use(express.static('public'));

// // Handle GET request to render the subscriber list page
// app.get('/subscriber-list', (req, res) => {
//     // Query the database to retrieve subscriber data
//     const sql = 'SELECT * FROM newsletter_subscriber';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching subscribers:', err);
//             return res.status(500).json({ error: 'Error fetching subscribers' });
//         }

//         // Render the subscriber-list.ejs template with the retrieved data
//         res.render('subscriber-list', { subscribers: results });
//     });
// });


// // ...

// // Handle GET request to render the subscription form
// app.get('/subscribe', (req, res) => {
//   res.render('subscribe', { message: null, messageClass: '' });
// });
// // Handle POST request to add an email to the database and display a message
// app.post('/subscribe', (req, res) => {
//   const { email } = req.body;

//   // Check if the email is valid (you can add more validation here)
//   if (!isValidEmail(email)) {
//       return res.render('subscribe', {
//           message: 'Invalid email address',
//           messageClass: 'error',
//       });
//   }

//   // Insert the email into the database
//   const sql = 'INSERT INTO newsletter_subscriber (emailid) VALUES (?)';
//   db.query(sql, [email], (err, result) => {
//       if (err) {
//           console.error('Error inserting email:', err);
//           return res.render('subscribe', {
//               message: 'Subscription failed. Please try again later.',
//               messageClass: 'error',
//           });
//       }
      
//       console.log('Email inserted into the database');
      
//       // Display a success message
//       res.render('subscribe', {
//           message: 'Thank you for subscribing!',
//           messageClass: 'success',
//       });
//   });
// });


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// // Function to validate an email address (you can use a library like validator.js)
// function isValidEmail(email) {
//     // Simple email validation, you can implement more robust validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }



const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;
// app.use(express.bodyParser());
// Create a MySQL database connection
const db = mysql.createConnection({
  host: '162.241.252.224',
  user: 'mijohhmy',
  password: 'Pass,1234',
  database: 'mijohhmy_phytolabcommunity'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});


app.use(bodyParser.urlencoded({extended: true}));


// Middleware for parsing JSON data
app.use(bodyParser.json());


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (CSS, JavaScript)
app.use(express.static('public'));
// app.use('/public/images/', express.static('./public/images'));

// Handle GET request to render the subscription form
app.get('/subscribe', (req, res) => {
    res.render('subscribe', { message: null, messageClass: '' });
});

// Handle POST request to add an email to the database and display a message
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    console.log(req.body);
    // Check if the email is valid (you can add more validation here)
    if (!isValidEmail(email)) {
        return res.render('subscribe', {
            message: 'Invalid email address',
            messageClass: 'error',
        });
    }

    // Insert the email into the database
    const sql = 'INSERT INTO newsletter_subscriber (emailid) VALUES (?)';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Error inserting email:', err);
            return res.render('subscribe', {
                message: 'Subscription failed. Please try again later.',
                messageClass: 'error',
            });
        }

        console.log('Email inserted into the database');

        // Display a success message
        res.render('subscribe', {
            message: 'Thank you for subscribing!',
            messageClass: 'success',
        });
    });
});

// Handle GET request to render the subscriber list page
app.get('/subscriber-list', (req, res) => {
    // Query the database to retrieve subscriber data
    const sql = 'SELECT * FROM newsletter_subscriber';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching subscribers:', err);
            return res.status(500).json({ error: 'Error fetching subscribers' });
        }

        // Render the subscriber-list.ejs template with the retrieved data
        res.render('subscriber-list', { subscribers: results });
    });
});

//create event free get method
app.get('/create-event-free', (req, res) => {
  res.render('createEvent', { message: null, messageClass: '' });
});

// Handle POST request to add an event form data to the database and display a message
app.post('/create-event-free', (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    

    // Insert the email into the database
    const sql = 'INSERT INTO create_event_free (event_name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.render('subscribe', {
                message: 'Subscription failed. Please try again later.',
                messageClass: 'error',
            });
        }

        console.log('Event inserted into the database');

        // Display a success message
        res.render('subscribe', {
            message: 'Thank you for subscribing!',
            messageClass: 'success',
        });
    });
});












// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to validate an email address (you can use a library like validator.js)
function isValidEmail(email) {
    // Simple email validation, you can implement more robust validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
