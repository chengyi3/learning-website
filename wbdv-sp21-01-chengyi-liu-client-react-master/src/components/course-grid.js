//import React , {useState} from 'react'
//import {Link} from "react-router-dom";
//import CourseRow from"./course-row";
//
//
//
//const CourseGrid = ({courses, deleteCourse}) => {
//    const [editing, setEditing] = useState(false);
//    const saveCourse = () => {
//            setEditing(false)
//            const newCourse = {
//                ...course,
//                title: title
//            }
//            updateCourse(newCourse)
//        }
//
//    return(
// const editing = useState(false)
// const setEditing = useState(false)
//const title = useState(course.title)

import React from 'react'
import CourseCard from "./course-card";
import {Link} from "react-router-dom";
import CourseManger from "./course-manager";

const CourseGrid = ({courses, updateCourse, deleteCourse}) =>
  <div>
      <div>
      <div className="container-fluid pt-1">

                   <div className="form-group row text-success" >
                       <div className="col-5">
                           Recent Documents
                       </div>
                       <div className="col-5 pl-1 d-none d-lg-block">
                           Owned by me
                           <i class="fa fa-sort-up"></i>
                       </div>

                       <div className="col-2 ">

                           <i className="fa fa-folder"></i>


                           <i className="fa fa-sort"></i>



                           <Link to="/courses/table">
                                <i className="fas fa-th fa"></i>
                                   </Link>


                       </div>

                   </div>
                   </div>

       </div>

    <div className="row">
    {
      courses.map(course =>
        <CourseCard course={course} updateCourse={updateCourse} deleteCourse={deleteCourse} />
      )
    }
    </div>
  </div>

export default CourseGrid









