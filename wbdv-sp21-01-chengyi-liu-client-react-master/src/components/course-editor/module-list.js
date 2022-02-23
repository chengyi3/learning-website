import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../../services/module-service"
import lessonService from "../../services/lesson-service"
import topicService from "../../services/topic-service"
import widgetsService from "../../services/widgets-service"

const ModuleList = (
    {
        myModules=[],
        createModule,
        deleteModule,
        updateModule,
        findModulesForCourse
    }) => {
    const {layout, courseId, moduleId} = useParams();
    useEffect(() => {
        // alert(courseId)
        findModulesForCourse(courseId)
    }, [])
    return(
    <div>
        <h2>Modules</h2>
        <ul className="list-group">
            {
                myModules.map(module =>
                    <li key = {module._id} className={`list-group-item ${module._id === moduleId ? 'active' : ''}`}>
                        <EditableItem
                            to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                            updateItem={updateModule}
                            deleteItem={deleteModule}
                            active={true}
                            item={module}/>
                    </li>
                )
            }
            <li className="list-group-item">
                <i onClick={() => createModule(courseId)} className="fas fa-plus fa-2x"></i>
            </li>
        </ul>
    </div>)}

const stpm = (state) => {
    return {
        myModules: state.moduleReducer.modules
    }
}
const dtpm = (dispatch) => {
    return {
        createModule: (courseId) => {
            moduleService.createModule(courseId, {title: "New Module"})
                .then(theActualModule => dispatch({
                    type: "CREATE_MODULE",
                    module: theActualModule
                }))
        },
        deleteModule: (item) => {

            moduleService.deleteModule(item._id)
                .then(status => {

                dispatch({type: "DELETE_MODULE", moduleToDelete: item})
                dispatch({type:"FIND_LESSONS_FOR_MODULE", lessons:[]})
                dispatch({type:"FIND_TOPICS_FOR_LESSON", topics:[]})
                }) },
        updateModule: (module) => {
            moduleService.updateModule(module._id, module)
                .then(status => dispatch({
                    type: "UPDATE_MODULE",
                    module
                })) },
        findModulesForCourse: (courseId) => {return(
            // alert(courseId);
            moduleService.findModulesForCourse(courseId)
                .then(theModules => dispatch({
                    type: "FIND_MODULES_FOR_COURSE",
                    modules: theModules
                })),

            lessonService.findLessonsForModule(undefined)
                    .then(lessons => dispatch({type: "FIND_LESSONS_FOR_MODULE", lessons: undefined})),
            topicService.findTopicsForLesson(undefined)
                    .then(topics => dispatch({type: "FIND_TOPICS_FOR_LESSON", topics: undefined})),
            widgetsService.findWidgetForTopic(undefined)
                    .then(widgets => dispatch({type: "FIND_WIDGET_FOR_TOPIC", widgets: undefined}))


        )}
    }
}

export default connect(stpm, dtpm)
        (ModuleList)