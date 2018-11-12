const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const responseTime = require('response-time');
var helmet = require('helmet');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json');

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/resources')));
app.use(session({ secret: 'HiQ', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(errorHandler());
app.use(responseTime());
app.use(helmet());

app.use(require('./routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: err,
        },
    });
});

const server = app.listen(8000, () => console.log('Server started on http://localhost:8000'));