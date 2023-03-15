const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
// const cookieParser = require('cookie-parser');




router.get('/', (req, res) => {
  res.render('quiz_results');
});


/*****************HELPER FUNCTIONS*********************/
//RETURN QUIZ ID BASED ON QUESTION ID
const getQuizId = function(question_id){
  const queryString = `SELECT quiz_id FROM questions WHERE id = $1;`;
  const queryParams = [question_id];
  return db.query(queryString, queryParams)
    .then(data=> {
      return data.rows[0].quiz_id;
    });

};

// getQuizId(3).then(data => console.log(data));

//RETURN CORRECT ANSWER BASED ON QUESTION ID
const getCorrectAnswer = function(question_id){
  const queryString = `SELECT correct_answer FROM questions WHERE id = $1;`;
  const queryParams = [question_id];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0].correct_answer;
    });
};

// getCorrectAnswer(3)
//   .then(result => console.log(result));


//GET USER ID BY EMAIL
const getUserIdByEmail = function(email) {
  const queryString = `SELECT id FROM users WHERE email = $1;`;
  const queryParams = [email];
  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows[0].id;
    })
}


//MARK ANSWERED QUESTIONS AND STORE DATA INTO QUIZ_RESULTS TABLE
const markQuiz = function(currentUserEmail, obj) {
  let correct_answers = 0;
  let incorrect_answers = 0;
  for (const [question_id, given_answer] of Object.entries(obj)) {

    console.log('question_id', question_id);
    console.log('given_answer', given_answer);


    const correctAnswer = getCorrectAnswer(question_id);
      if (correctAnswer === given_answer) {
        correct_answers ++;
      } else {
        incorrect_answers ++
      }
   }
   const quizIdArr = Object.keys(obj);
   const quizId = getQuizId(quizIdArr[0]);


   const userId = getUserIdByEmail(currentUserEmail);


   const result = Math.floor(correct_answers/(correct_answers + incorrect_answers) * 100);
   const queryParams = [quizId, userId, correct_answers, incorrect_answers, result];
   const queryString = `
     INSERT INTO quiz_results (quiz_id, participant_id, number_of_correct_answer, number_of_incorrect_answer, result)
     VALUES ($1, $2, $3, $4, $5);
   `;
   db.query(queryString, queryParams)
   .then(data => {
     res.status(200);
   })
   .catch(err => {
     res.status(500);
   });

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
const storeAnswers = function(quizResultID ,obj) {
  for (const [question_id, given_answer] of Object.entries(obj)) {
   console.log('question_id', question_id);
   console.log('given_answer', given_answer);

   const queryParams = [question_id, quizResultID, given_answer];
   const queryString = `
   INSERT INTO answered_questions (question_id, quiz_result_id, given_answer)
   VALUES ($1, $2, $3);
 `;
   db.query(queryString, queryParams)
   .then(data => {
     res.status(200);
   })
   .catch(err => {
     res.status(500);
   });

  }

 }

/*****************END HELPER FUNCTIONS*********************/


// URL should be wildcard /:id

router.post('/', (req, res) => {
  console.log(req.body);
  // res.send(req.body);
  const submittedAnswers = req.body;
  console.log(submittedAnswers);

  const userEmail = req.cookies.username;
// console.log(user);

  markQuiz(userEmail, submittedAnswers);
  // storeAnswers(submittedAnswers);

  const userID = getUserIdByEmail(userEmail);

  const quizResultID = findLatestQuizResultIdByUserID(userID)

  storeAnswers(quizResultID, submittedAnswers);
});


module.exports = router;
