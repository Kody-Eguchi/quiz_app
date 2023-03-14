// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const quizzesApiRoutes = require('./routes/quizzes-api');
const quizResultsApiRoutes = require('./routes/quiz_results-api');
const answeredQuestionsApiRoutes = require('./routes/answered_questions-api');
const questionsApiRoutes = require('./routes/questions-api');


const usersRoutes = require('./routes/users');
const exploreRoutes = require('./routes/explore');
const createNewQuizRoutes = require('./routes/create_new_quiz');
const takeQuizRoutes = require('./routes/take_quiz');
const loginRoutes = require('./routes/login');



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/quizzes', quizzesApiRoutes);
app.use('/api/questions', questionsApiRoutes);
app.use('/api/quiz_results', quizResultsApiRoutes);
app.use('/api/answered_questions', answeredQuestionsApiRoutes);

app.use('/users', usersRoutes);
app.use('/explore', exploreRoutes);
app.use('/create_new_quiz', createNewQuizRoutes);
app.use('/take_quiz', takeQuizRoutes);
app.use('/login', loginRoutes);

//list of api end point
/*

*/

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index')
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
