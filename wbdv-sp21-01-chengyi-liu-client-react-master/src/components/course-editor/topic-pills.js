import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import topicService from "../../services/topic-service";
import widgetsService from "../../services/widgets-service"
const TopicPills = (
    {
        topics=[],
        findTopicsForLesson,
        createTopic,
        deleteTopic,
        updateTopic,


    }) => {
    const {layout, courseId, moduleId, lessonId, topicId} = useParams();
    useEffect(() => {
              if(lessonId !== "undefined" && typeof lessonId !== "undefined") {
                          findTopicsForLesson(lessonId)
              }

    }, [lessonId])
    return(
    <div>
        <h3> topics </h3>
        <ul className="nav nav-pills">
            {
                topics.map(topic =>
                    <li key = {topic._id} className="nav-item">
                        <EditableItem
                            active={topic._id === topicId}
                            to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                            updateItem={updateTopic}
                            deleteItem={deleteTopic}
                            item={topic}/>
                    </li>
                )
            }
            <li>
                <i onClick={() => createTopic(lessonId)} className="fas fa-plus"></i>
            </li>
        </ul>
    </div>)}

const stpm = (state) => ({
    topics: state.topicReducer.topics
})
const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => {
    return (
        topicService.findTopicsForLesson(lessonId)
            .then(topics => dispatch({
                type: "FIND_TOPICS_FOR_LESSON",
                topics
            })),
        widgetsService.findWidgetForTopic(undefined)
                            .then(widgets => dispatch({type: "FIND_WIDGET_FOR_TOPIC", widgets: undefined}))

    )},
    createTopic: (lessonId) => {
        topicService
            .createTopic(lessonId, {title: "New Topic"})
            .then(topic => dispatch({
                type: "CREATE_TOPIC",
                topic
            }))
    },
    deleteTopic: (item) =>
                topicService.deleteTopic(item._id)
                    .then(status => dispatch({
                        type: "DELETE_TOPIC",
                        topicToDelete: item
                    })),

    updateTopic: (topic) =>
         topicService.updateTopic(topic._id, topic)
              .then(status => dispatch({
                  type: "UPDATE_TOPIC",
                     topic
      }))




})

export default connect(stpm, dtpm)(TopicPills)
