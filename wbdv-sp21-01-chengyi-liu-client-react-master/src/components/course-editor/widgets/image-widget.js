import React, {useState, useEffect} from 'react'

const ImageWidget = ({widget, key, deleteWidget, updateWidget}) => {
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

                URL
                <input value={cachedItem.url} onChange={(e) => setCachedItem({...cachedItem, url: e.target.value})} className="form-control"/>
                 width
                <input value={cachedItem.width} onChange={(e) => setCachedItem({...cachedItem, width: e.target.value})} className="form-control"/>
                   height
                 <input value={cachedItem.height} onChange={(e) => setCachedItem({...cachedItem, height: e.target.value})} className="form-control"/>

             </div>
            }
            {
            !editing &&
            <div>
            <i onClick={() => setEditing(true)} className="fas fa-cog float-right"></i>

            {cachedItem.url == null ? <h2> image widget </h2> : <img src = {cachedItem.url} height = {cachedItem.height} width = {cachedItem.width} />}

            </div>
            }


        </div>
    )
}

export default ImageWidget