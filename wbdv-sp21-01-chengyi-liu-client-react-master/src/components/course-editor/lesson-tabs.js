import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import lessonService from "../../services/lesson-service";
import topicService from "../../services/topic-service";
import widgetsService from "../../services/widgets-service"
const LessonTabs = (
    {
        lessons=[],
        findLessonsForModule,
        createLessonForModule,
        deleteLesson,
        updateLesson

    }) => {
    const {layout, courseId, moduleId, lessonId} = useParams();
    useEffect(() => {
        if(moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
    }, [moduleId])
    return(
    <div>
        <h3>lessons</h3>
        <ul className="nav nav-pills">
            {
                lessons.map(lesson =>
                    <li key = {lesson._id} className="nav-item">
                        <EditableItem

                            to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}

                            active={lesson._id == lessonId}
                            updateItem={updateLesson}
                            deleteItem={deleteLesson}
                            item={lesson}/>
                    </li>
                )
            }
            <li>
                <i onClick={() => createLessonForModule(moduleId)} className="fas fa-plus"></i>
            </li>
        </ul>
    </div>)}

const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})
const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => { return(
        lessonService.findLessonsForModule(moduleId)
            .then(lessons => dispatch({
                type: "FIND_LESSONS_FOR_MODULE",
                lessons
            })),

        topicService.findTopicsForLesson(undefined)
                            .then(topics => dispatch({type: "FIND_TOPICS_FOR_LESSON", topics: undefined})),
        widgetsService.findWidgetForTopic(undefined)
                            .then(widgets => dispatch({type: "FIND_WIDGET_FOR_TOPIC", widgets: undefined}))
    )},
    createLessonForModule: (moduleId) => {
        lessonService
            .createLessonForModule(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({
                type: "CREATE_LESSON",
                lesson
            }))
    },
    deleteLesson: (item) => {


                lessonService.deleteLesson(item._id)

                    .then(status => {

                    dispatch({
                        type: "DELETE_LESSON",
                        lessonToDelete: item
                    })
                    dispatch({type:"FIND_TOPICS_FOR_LESSON", topics:[]})

                    })} ,

    updateLesson: (lesson) => {
         lessonService.updateLesson(lesson._id, lesson)
              .then(status => dispatch({
                  type: "UPDATE_LESSON",
                     lesson
      }))
      console.log("hello update")
      }


})

export default connect(stpm, dtpm)(LessonTabs)