import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import Question from "./questions/question";
import questionService from "../../services/question-service";
import quizService from "../../services/quiz-service";

const Quiz = () => {
    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    const [attempts, setAttempts] =  useState([]);
    useEffect(() => {
        // TODO: move this to a service file
        questionService.findQuestionsForQuiz(quizId)
            .then(questions => setQuestions(questions))
        },[quizId])
    console.log(questions)
    useEffect(() => {
            // TODO: move this to a service file
            quizService.findAttemptsForQuiz(quizId)
                .then(attempts => setAttempts(attempts))
            },[quizId])

    return(
        <div>
            <h2>Quiz {quizId}</h2>
            <button variant = "primary"  onClick={() => {quizService.submitQuiz(quizId, questions)}}>
            Submit
            </button>
            <ul>
            {attempts.map(attempt => <li> attempt: {attempt._id}  score:{attempt.score} </li>)}
            </ul>
            <ul>
                {
                    questions.map(question =>
                    <li>
                        <Question question={question}/>
                    </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Quiz;