module.exports = (app) => {
    const questionService = require("../services/questions-service")

    const findAllQuestions = (req, res) => {
         questionService.findAllQuestions()
                     .then((questions) => {
                         res.send(questions)
                     })
//        const questions = questionService.findAllQuestions()
//        res.send(questions)
    }

    const findQuestionsForQuiz = (req, res) => {
        const quizId = req.params.qzid;
        questionService.findQuestionsForQuiz(quizId)
                    .then((questions) => {
                        res.send(questions)
                    })
//        const questions = questionService.findQuestionsForQuiz(quizId);
//        res.send(questions);
    }

    app.get("/api/questions", findAllQuestions);
    app.get("/api/quizzes/:qzid/questions", findQuestionsForQuiz);
    app.get('/api/questions/:qid', (req, res) =>
           questionService.findQuestionById(req.params['qid'])
               .then(question => res.json(question)))
}