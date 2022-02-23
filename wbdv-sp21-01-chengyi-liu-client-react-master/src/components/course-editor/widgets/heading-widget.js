import React, {useState} from 'react'

const HeadingWidget = ({key, deleteWidget, widget, updateWidget}) => {


const [editing, setEditing] = useState(false)
 const [cachedItem, setCachedItem] = useState(widget)
return (

    <div>

        {
            editing &&
            <div>
                <i onClick={() => deleteWidget(cachedItem)} className="fas fa-trash float-right"></i>
                <i onClick={() => {
                                     setEditing(false)
                                     updateWidget(cachedItem)
                                                    }} className="fas fa-check float-right"></i>
                <input key = {key} onChange={(e) => setCachedItem({...cachedItem, text: e.target.value})} value={cachedItem.text} className="form-control"/>
                <select onChange={(e) => setCachedItem ({...cachedItem, size: parseInt(e.target.value)})} value={cachedItem.size} className="form-control">
                    <option value={1}>Heading 1</option>
                    <option value={2}>Heading 2</option>
                    <option value={3}>Heading 3</option>
                    <option value={4}>Heading 4</option>
                    <option value={5}>Heading 5</option>
                    <option value={6}>Heading 6</option>
                </select>
                <select onChange={(e) => setCachedItem ({...cachedItem, type: e.target.value})} value={cachedItem.type} className="form-control">
                                    <option value={"HEADING"} >Heading widget</option>
                                    <option value={"PARAGRAPH"} >paragraph widget</option>
                                    <option value={"LIST"} >list widget</option>
                                    <option value={"IMAGE"} >image widget</option>

                                </select>



            </div>
        }
        {
            !editing && <div>
             <i onClick={() => setEditing(true)} className="fas fa-cog float-right"></i>

             { widget.size ===1 && <h1>{widget.text}</h1>}
                     { widget.size ===2 && <h2>{widget.text}</h2>}
                     { widget.size ===3 && <h3>{widget.text}</h3>}
                     { widget.size ===4 && <h4>{widget.text}</h4>}
                     { widget.size ===5 && <h5>{widget.text}</h5>}
                     { widget.size ===6 && <h6>{widget.text}</h6>}


                        </div>
        }
    </div>

    )
    }

export default HeadingWidget