import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import ImageWidget from "./image-widget";
import ListWidget from "./list-widget";
import {useParams} from "react-router-dom";
import widgetService from "../../../services/widgets-service";
import widgetReducer from "../../../reducers/widget-reducer";
const WidgetList = (
    {
    widgets=[],
    findWidgetForTopic,
    createWidget,
    deleteWidget,
    updateWidget,
    }

     ) => {
    const {topicId} = useParams()



    const [widget, setWidget] = useState({})
    useEffect(() => {
             if(topicId !== "undefined" && typeof topicId !== "undefined") {
                   findWidgetForTopic(topicId)
}
    }, [topicId])

    return(
        <div>
            <i onClick={()=>{createWidget(topicId)}} className="fas fa-plus float-right fa-2x"></i>
            <h1>Widget List </h1>
            <ul className="list-group">
                {
                    widgets.map(_widget =>
                        <li key={_widget.id} className="list-group-item">
                            {
                                _widget.type === "HEADING" && <HeadingWidget widget={_widget} updateWidget = {updateWidget}
                                                             deleteWidget = {deleteWidget} key={_widget.id}/>

                           }
                           {
                             _widget.type === "PARAGRAPH" && <ParagraphWidget widget={_widget} updateWidget = {updateWidget}
                                                                                        deleteWidget = {deleteWidget} key={_widget.id}/>

                           }
                           {
                            _widget.type === "IMAGE" && <ImageWidget widget={_widget} updateWidget = {updateWidget}
                                                       deleteWidget = {deleteWidget} key={_widget.id}/>

                           }
                           {
                            _widget.type === "LIST" && <ListWidget widget={_widget} updateWidget = {updateWidget}
                                deleteWidget = {deleteWidget} key={_widget.id}/>

                           }

                            </li>

                    )
                    }

            </ul>
        </div>
    )
}

const stpm = (state) => ({
    widgets: state.widgetReducer.widgets

})
const dtpm = (dispatch) => ({
    findWidgetForTopic: (topicId) => {


        widgetService.findWidgetForTopic(topicId)
            .then(widgets => dispatch({
                type: "FIND_WIDGET_FOR_TOPIC",
                widgets
            }))


    },
    createWidget: (topicId) => {
        widgetService
            .createWidget(topicId, {type: "HEADING", size: 1, text: "New Widget"})
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget
            }))
    },
    deleteWidget: (item) =>
                widgetService.deleteWidget(item.id)
                    .then(status => dispatch({
                        type: "DELETE_WIDGET",
                        widgetToDelete: item
                    })),

    updateWidget: (widget) =>
{    console.log("widget in update: ", widget)
         widgetService.updateWidget(widget.id, widget)
              .then(status => dispatch({
                  type: "UPDATE_WIDGET",
                  widget
      }))}


})
export default connect(stpm, dtpm)(WidgetList)

