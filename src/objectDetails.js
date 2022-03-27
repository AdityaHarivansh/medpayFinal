import { Card, Tag } from "antd";
import React, { useState } from "react";

const ObjectDetails=(props)=>{

    //to set a property and the data to which the property belongs and send it to the parent
    const setMainData=(key)=>{
        props.getProperty(key) 
        props.getMainData(props.objectData)
    }

    //loop through all keys of the object and show them as tags
    return(
    <div className="row">
        {Object.keys(props.objectData).map((key,i)=>{
            return(
                    key!="links" && <div className="col-lg-12" style={{textAlign:"center"}}>
                        <Tag color={props.color} style={{marginTop:"1rem",cursor:"pointer"}} onClick={()=>setMainData(key)}>{key}</Tag>
                    </div>
            )
        })}
    </div>
    )
}

export default ObjectDetails