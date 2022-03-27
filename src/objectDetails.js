import { Card, Tag } from "antd";
import React, { useState } from "react";

const ObjectDetails=(props)=>{

    const setMainData=(key)=>{
        props.getProperty(key) 
        props.getMainData(props.objectData)
    }
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