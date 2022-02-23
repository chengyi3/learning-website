import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";

export default class CourseTable extends
  React.Component {

    constructor(props) {
        super(props);
    }

  render() {
    return(
      <div>


         <div className="container-fluid pt-2">

             <div className="form-group row text-success" >
                 <div className="col-4">
                     Title
                 </div>
                 <div className="col-2 pl-1 d-none d-lg-block">
                     Owned by
                     <i class="fa fa-sort-up"></i>
                 </div>
                 <div className="col-4 d-none d-lg-block">
                     Last modified
                 </div>
                 <div className="col-2">

                     <i className="fa fa-folder"></i>


                     <i className="fa fa-sort"></i>


                     <Link to="/courses/grid">
                          <i className="fas fa-th fa"></i>
                             </Link>

                 </div>

             </div>
             </div>




        <table className="table">
            <thead></thead>
            <tbody>
              {/*<CourseRow title="CS5610" owner="me"/>*/}
              {/*<CourseRow title="CS3200" owner="you"/>*/}
              {/*<CourseRow title="CS5200" owner="him"/>*/}
              {/*<CourseRow title="CS4550" owner="she"/>*/}
              {
                this.props.courses.map(course =>
                  <CourseRow
                      key={course._id}
                      deleteCourse={this.props.deleteCourse}
                      updateCourse={this.props.updateCourse}


                    course={course}


                    title={course.title}



                    lastModified={course.lastModified}

                    owner={course.owner}/>)

              }
            </tbody>
        </table>
      </div>
    )
  }
}