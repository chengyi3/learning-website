
import React,{useEffect} from 'react';
import {useState} from 'react';
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../../reducers/modules-reducer";
import lessonReducer from "../../reducers/lesson-reducer";
import topicReducer from "../../reducers/topic-reducer";
import widgetReducer from "../../reducers/widget-reducer";
import courseService from"../../services/course-service";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";
import WidgetList from "./widgets/widget-list";

const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer,
    widgetReducer: widgetReducer
})

const store = createStore(reducer)

const CourseEditor = ({history}) => {
    const {layout, courseId, moduleId} = useParams();
    const [state, setTitle] = useState([]);
    useEffect(() => {
            // alert(courseId)
            courseService.findCourseById(courseId).then(course => {
                                                              setTitle(course)
                                                          })

        }, [])
    return (
    <Provider store={store}>
        <div>
            <h2>

                <Link to={`/courses/${layout}`}>
                    <i className="fas fa-times"></i>
                </Link>
                 {state.title}

            </h2>
            <div className="row">
                <div className="col-4">
                    <ModuleList/>
                </div>
                <div className="col-8">
                    <LessonTabs/>
                    <TopicPills/>
                    <WidgetList/>
                </div>
            </div>
        </div>
    </Provider>)}

export default CourseEditor