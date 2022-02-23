import React, {useState, useEffect} from 'react'

const ParagraphWidget = ({widget, key, deleteWidget, updateWidget}) => {
const [editing, setEditing] = useState(false)
 const [cachedItem, setCachedItem] = useState(widget)
    return (
        <div>

            {
                editing &&
                <div>
                <i onClick={() => {deleteWidget(cachedItem)}} className="fas fa-trash float-right"></i>
                <i onClick={() => {
                                       setEditing(false)
                                       updateWidget(cachedItem)
                                                                       }} className="fas fa-check float-right"></i>
                <textarea
                    onChange={(e) => setCachedItem({...cachedItem, text: e.target.value
                                                                 })}
                    value={cachedItem.text}
                    className="form-control"></textarea>

                <select onChange={(e) => setCachedItem({...cachedItem, type: e.target.value})} value={cachedItem.type} className="form-control">
                   <option value={"HEADING"}  >Heading widget</option>
                    <option value={"PARAGRAPH"} >paragraph widget</option>
                    <option value={"LIST"} >list widget</option>
                    <option value={"IMAGE"} >image widget</option>
                   </select>


             </div>
            }
            {
            !editing &&
            <div>
            <i onClick={() => setEditing(true)} className="fas fa-cog float-right"></i>

            <p>{cachedItem.text}</p>
            </div>
            }


        </div>
    )
}

export default ParagraphWidget