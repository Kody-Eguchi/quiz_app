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
}


//MARK ANSWERED QUESTIONS AND STORE DATA INTO QUIZ_RESULTS TABLE
const markQuiz = async function(currentUserEmail, obj) {



  const getCorrectAnswerPromises = Object.entries(obj).map(([question_id]) => {
    return getCorrectAnswer(question_id)
  })

  const givenAnswers =  Object.entries(obj).map(([_,given_answer]) => given_answer)

  const { correctAnswersCount, incorrectAnswersCount } = await Promise.all(getCorrectAnswerPromises).then((correctAnswers) => {
    let correctAnswersCount = 0;
    let incorrectAnswersCount = 0;

    for (let i = 0; i <  correctAnswers.length; i++) {
      correctAnswers[i] === givenAnswers[i] ? correctAnswersCount++ : incorrectAnswersCount++
    }

    return { correctAnswersCount, incorrectAnswersCount }
  })





   const quizIdArr = Object.keys(obj);



 return getQuizId(quizIdArr[0]).then(quizId => {
    // quizId = data;
    console.log('🍎', quizId);
    getUserIdByEmail(currentUserEmail)
    .then((userId) => {
      const result = Math.floor(correctAnswersCount/(correctAnswersCount + incorrectAnswersCount) * 100);
      const queryParams = [quizId, userId, correctAnswersCount, incorrectAnswersCount, result, 'blahh'];
      console.log('queryParams',queryParams)
      const queryString = `
       INSERT INTO quiz_results (quiz_id, participant_id, number_of_correct_answer, number_of_wrong_answer, result, quiz_result_url  )
       VALUES ($1, $2, $3, $4, $5, $6);
     `;
      return db.query(queryString, queryParams)
  })
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
const storeAnswers = function(obj) {
  return Object.entries(obj).map(([question_id, given_answer]) => {
    const queryParams = [question_id, given_answer];
    const queryString = `
    INSERT INTO answered_questions (question_id, given_answer)
    VALUES ($1, $2);
  `;
    return db.query(queryString, queryParams)
  })


 }

/*****************END HELPER FUNCTIONS*********************/


// URL should be wildcard /:id

router.post('/', (req, res) => {
  console.log(req.body);
  // res.send(req.body);
  const submittedAnswers = req.body;
  // console.log(submittedAnswers);

  const userEmail = req.cookies.username;
// console.log(user);

  markQuiz(userEmail, submittedAnswers)
  .then(async () => {

    // const userID = getUserIdByEmail(userEmail);
    // const quizResultID = findLatestQuizResultIdByUserID(userID)
    await Promise.all(storeAnswers(submittedAnswers));

    console.log('DATE INSERT WAS SUCESSFULL 🚨')
    res.status(200);

  })
  .catch(err => {
    res.status(500);
  });



});


module.exports = router;
