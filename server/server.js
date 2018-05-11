const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Route includes
const uploadRouter = require('./routes/upload.router');
const downloadRouter = require('./routes/download.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Routes */
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);


// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
