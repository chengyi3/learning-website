import React, {useState} from 'react'
import {Link} from "react-router-dom";

const CourseRow = (
  {
    course,
    lastModified="1/1/2021",
    owner="who knows?",
      deleteCourse,
      updateCourse
  }) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(course.title)

    const saveCourse = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: title
        }
        updateCourse(newCourse)
    }

    return(
    <div>
        <tr className="row">

        <td className="col-4">
            {
                !editing &&
                <Link to={`/courses/table/edit/${course._id}`}>
                    {course.title}
                </Link>
            }
            {
                editing &&
                <input
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}/>
            }
        </td>


        <td className = "col-2 d-none d-lg-block">{course.owner}</td>


        <td className = "col-2 d-none d-lg-block">{course.lastModified}</td>

        <td className = "col-2 d-none d-lg-block">
           <Link to={`/courses/${course._id}/quizzes`}>
                  Quizzes
                </Link>
         </td>

        <td className = "col-2">
            <i onClick={() => deleteCourse(course)} className="fas fa-trash"></i>
            {/*<i onClick={() => setEditing((prevEditing) => !prevEditing)} className="fas fa-edit"></i>*/}

            {
                editing &&
                <i onClick={() => saveCourse()} className="fas fa-check"></i>
            }

            {
                !editing &&
                <i onClick={() => setEditing(true)} className="fas fa-edit"></i>
            }


        </td>

    </tr>
    </div>)
}

export default CourseRow