import React from 'react'
import {Link,Route} from "react-router-dom";

export default () =>
    <>
        <h1>Home</h1>
        <div className="list-group">

            <Link to="/courses/table"  className="list-group-item">
                Course Table
            </Link>
            <Link to="/courses/grid"  className="list-group-item">
                            Course Grid
                        </Link>


        </div>
    </>