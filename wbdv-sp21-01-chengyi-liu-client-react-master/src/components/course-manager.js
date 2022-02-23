import React from 'react'
import CourseTable from "./course-table";
import CourseGrid from "./course-grid";
import CourseEditor from "./course-editor/course-editor";
import {Link, Route} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse} from "../services/course-service";


export default class CourseManager
  extends React.Component {


    constructor() {
       super();
       this.handleChange = this.handleChange.bind(this)
       this.state = {
                  courses: [],
                  value: "new course"

               };
      this.fabStyle = {
                 right: 20,
                 position: 'fixed',
                 bottom:5,
                 float: true
             };
    }


   handleChange(event) {
       this.setState({value: event.target.value});
   }



  componentDidMount() {
    courseService.findAllCourses()
        .then(courses => this.setState({courses}))
        // .then(courses => this.setState({courses: courses}))
  }

  updateCourse = (course) => {
    courseService.updateCourse(course._id, course)
        .then(status => {
            this.setState((prevState) => {
                let nextState = {...prevState}
                nextState.courses = prevState.courses.map(c => {
                    if(c._id === course._id) {
                        return course
                    } else {
                        return c
                    }
                })
                return nextState
            })
        })
  }
//  const fabStyle = {
//      right: 20,
//      position: 'fixed'
//  };

  deleteCourse = (course) => {
    // alert("delete course " + course._id)
    courseService.deleteCourse(course._id)
        .then(status => {
          // this.setState({
          //   courses: this.state.courses.filter(c => c._id !== course._id)
          // })
          this.setState((prevState) => ({
            courses: prevState.courses.filter(c => c._id !== course._id)
          }))
        })
  }

  addCourse = () => {
    // alert('add course')
    const newCourse = {
      title: this.state.value,
      owner: "me",
      lastModified: "2/10/2021"
    }
    courseService.createCourse(newCourse)
        .then(actualCourse => {
          this.state.courses.push(actualCourse)
          this.setState(this.state)
        })

        this.setState({
              value: 'new course'
            });


  }

  render() {
    return(
     <div>

        <div className = "container-fluid pt-1 pb-2">
          <div className="row  text-success" >
                  <div className="col-1">
                      <i className="fa fa-bars fa-2x"></i>
                  </div>
                  <div className="col-2 d-none d-lg-block  text-success" >
                      <h4>Course Manager</h4>
                  </div>
                  <div className="col-7" >
                      <input className="form-control" id="n" value = {this.state.value} onChange = {this.handleChange} />
                  </div>

                  <div className="col-1" >
                      <i className="fa fa-plus fa-2x"  onClick={this.addCourse}>

                      </i>
                  </div>
                  <div className="col-1 pr-0">
                      <Link to="/">
                          <i className="fas fa-2x fa-home float-right"></i>
                                     </Link>
                                     </div>

</div>
 </div>


        <Route path="/courses/table" exact = {true}>
          <CourseTable
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}
              courses={this.state.courses}/>
        </Route>

        <Route path="/courses/grid" exact = {true} >
          <CourseGrid courses={this.state.courses}
                      updateCourse={this.updateCourse}
                      deleteCourse={this.deleteCourse}
          />
        </Route>


        <div>
                    <i className="fa fa-plus fa-4x text-danger" style = {this.fabStyle} onClick={this.addCourse}>

                            </i>
        </div>

      </div>
    )
  }
}