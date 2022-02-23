import React, {useState, useEffect} from 'react'

const ListWidget = ({widget, key, deleteWidget, updateWidget}) => {
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
                 <input type="checkbox" onClick={() => setCachedItem({...cachedItem, ordered : !cachedItem.ordered
                                                                                                         })} /> ordered

                 <br/>
                    List Items
                <textarea rows={10}
                    onChange={(e) => setCachedItem({...cachedItem, text: e.target.value
                                                                 })}
                    value={cachedItem.text}
                    className="form-control">
                    </textarea>




             </div>
            }
            {
            !editing &&
            <div>
            <i onClick={() => setEditing(true)} className="fas fa-cog float-right"></i>
            <>
                                {

                                        cachedItem.ordered &&

                                        <ol>

                                            {

                                                cachedItem.text.split("\n").map(item => {
                                                    return(
                                                        <li>{item}</li>
                                                    )
                                                })
                                            }

                                        </ol>
                                    }
                                    {
                                        !cachedItem.ordered &&
                                        <ul>
                                            {
                                                cachedItem.text.split("\n").map(item => {
                                                    return(
                                                        <li>{item}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    }
                                </>



            </div>
            }


        </div>
    )
}

export default ListWidget