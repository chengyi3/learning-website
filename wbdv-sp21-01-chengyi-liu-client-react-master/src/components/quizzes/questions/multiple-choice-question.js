import React, {useState} from "react";

const MultipleChoiceQuestion = ({question}) => {
 const [answer, setAnswer] = useState(null)
 const [grade, setGrade] = useState(false)
 question.answer = answer;
    return(
        <div>
            <h4>{question.question}

            {
                  grade && answer == question.correct &&
                    <i className="fas fa-check"></i>

            }


           {
                grade && answer != question.correct &&
                <i className="fas fa-times"></i>
            }
            </h4>

            {
                grade && question.choices.map((choice) => {
                    return(

                       <label className={`list-group-item ${(grade && question.correct === choice) ? 'list-group-item-success' : ((answer == choice && (answer) != question.correct)) ? 'list-group-item-danger' : ''}`}>
                            <input type="radio" name={question._id} onClick={() => {setAnswer(choice); setGrade(false)}} />
                            {choice}
                        </label>




                    )
                }
                )
            }
            {
            !grade && question.choices.map((choice) => {
                                          return(

                                             <label className={"list-group-item"}>
                                                  <input type="radio" name={question._id} onClick={() => {setAnswer(choice); setGrade(false)}} />
                                                  {choice}
                                              </label>




                                          )
                                      }
                                      )
            }


            <div>
                 <button variant = "primary" onClick={() => setGrade(true)}>
                      Grade
                </button>
             </div>
        </div>
    )
}

export default MultipleChoiceQuestion;