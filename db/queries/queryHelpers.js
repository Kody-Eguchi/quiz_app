const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

//query database to get all users
const getAllUsers = function() {
  return db.query(`SELECT * FROM users;`)
  .then(res => {
    return res.rows;
  })
  .catch(err => {
    console.error("Error: ", err.message);
  })
};

//RETURN QUIZ ID BASED ON QUESTION ID
const getQuizId = function(question_id){
  const queryString = `SELECT quiz_id FROM questions WHERE id = $1;`;
  const queryParams = [question_id];
  return db.query(queryString, queryParams)
    .then(data=> {
      return data.rows[0].quiz_id;
    });

};

//RETURN CORRECT ANSWER BASED ON QUESTION ID
const getCorrectAnswer = function(question_id){
  const queryString = `SELECT correct_answer FROM questions WHERE id = $1;`;
  const queryParams = [question_id];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0].correct_answer;
    });
};


//GET USER ID BY EMAIL
const getUserIdByEmail = function(email) {
  const queryString = `SELECT id FROM users WHERE email = $1;`;
  const queryParams = [email];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0].id;
    })
};

//GET NUMBER OF ATTEPT BY USER_ID AND QUIZ_ID
const getNumOfAtteptByUser = function(userId, quizId) {
  const queryParams = [quizId, userId];
  const queryString = `SELECT count(*) FROM quiz_results WHERE quiz_id = $1 AND participant_id = $2;`;
  return db.query(queryString, queryParams)
  .then(data => {
    return data.rows[0].count;
  })
};

//MARK ANSWERED QUESTIONS AND STORE DATA INTO QUIZ_RESULTS TABLE
const markQuiz = async function(currentUserEmail, obj) {
    const getCorrectAnswerPromises = Object.entries(obj).map(([question_id]) => {
      return getCorrectAnswer(question_id);
    });
    const givenAnswers = Object.entries(obj).map(([_, given_answer]) => given_answer);
    const correctAnswers = await Promise.all(getCorrectAnswerPromises);

    let correctAnswersCount = 0;
    let incorrectAnswersCount = 0;

    for (let i = 0; i < correctAnswers.length; i++) {
      correctAnswers[i].includes(givenAnswers[i]) ? correctAnswersCount++ : incorrectAnswersCount++;
    }

    const quizIdArr = Object.keys(obj);
    const quizId = await getQuizId(quizIdArr[0]);
    const userId = await getUserIdByEmail(currentUserEmail);

    let numOfAttempt = await getNumOfAtteptByUser(userId, quizId);
    numOfAttempt = Number(numOfAttempt) + 1;

    const result = Math.floor(correctAnswersCount / (correctAnswersCount + incorrectAnswersCount) * 100);
    const queryParams = [quizId, userId, correctAnswersCount, incorrectAnswersCount, result, numOfAttempt];
    const queryString = `
      INSERT INTO quiz_results (quiz_id, participant_id, number_of_correct_answer, number_of_wrong_answer, result, num_of_attempt)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

    return db.query(queryString, queryParams);

};


// FIND LATEST QUIZ_RESULT_ID BASED ON USER_ID
const findLatestQuizResultIdByUserID = function(userID) {
  const queryParams = [userID];
  const queryString = `SELECT quiz_results.id FROM quiz_results
                        JOIN users on users.id = participant_id
                        WHERE participant_id = $1
                        ORDER BY completed_at
                        LIMIT 1;`;

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0].id;
    })
};

//INSERT DATA TO ANSWERED QUESTION TABLE
const storeAnswers = function(obj) {
  return Object.entries(obj).map(([question_id, given_answer]) => {
    const queryParams = [question_id, given_answer];
    const queryString = `
    INSERT INTO answered_questions (question_id, given_answer)
    VALUES ($1, $2);
  `;
    return db.query(queryString, queryParams)
  })
 };

module.exports = {
  getUsers,
  getAllUsers,
  getUserIdByEmail,
  getQuizId,
  getCorrectAnswer,
  getNumOfAtteptByUser,
  markQuiz,
  storeAnswers
};
