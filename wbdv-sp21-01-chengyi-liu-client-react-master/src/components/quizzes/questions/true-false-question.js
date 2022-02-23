import React, {useState} from "react";
import {useEffect} from "react";
const TrueFalseQuestion = ({question}) => {
    const [answer, setAnswer] = useState(null)
    const [grade, setGrade] = useState(false)
    var isanswercorrect = false;
    question.answer = answer;
    console.log("ques", question)
    console.log("ans", isanswercorrect)
    return (
        <div>
            <h4>
                {question.question}


                {
                    grade && (answer == question.correct) &&
                    <i className="fas fa-check"></i>

                }


                {
                    grade && (answer != question.correct) &&
                    <i className="fas fa-times"></i>

                }

            </h4>








                 { grade && <div>
                 <div className={`list-group-item  ${(grade && question.correct === "true") ? 'list-group-item-success' : (grade && (answer) == question.correct) ? '' : 'list-group-item-danger'}`} >
                                  <label ><input
                                                     type="radio"
                                 onClick={() => {setAnswer("true"); setGrade(false)}}
                                   name={question._id}/>True</label>
                                   </div>
                                   <div className={`list-group-item ${(grade && question.correct == "false") ? 'list-group-item-success' : (grade && (answer) == question.correct) ? '' : 'list-group-item-danger'}`}>
                                  <label ><input type="radio"
                                   onClick={() => {setAnswer("false"); setGrade(false)}}
                                  name={question._id}/>False</label>

                                   </div>
                                   </div>}
                 {!grade && <div> <div className={"list-group-item"} >
                                                              <label ><input
                                                                                 type="radio"
                                                             onClick={() => {setAnswer("true"); setGrade(false)}}
                                                               name={question._id}/>True</label>
                                                               </div>
                                                               <div className={"list-group-item"}>
                                                              <label ><input type="radio"
                                                               onClick={() => {setAnswer("false"); setGrade(false)}}
                                                              name={question._id}/>False</label>

                                                               </div>
                                                               </div>}



             <div>
                <button variant = "primary"  onClick={() => setGrade(true)}>
                     Grade
               </button>
             </div>
        </div>
    )
}

export default TrueFalseQuestion;