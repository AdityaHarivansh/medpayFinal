import { Card, Tag } from "antd";
import React, { useState } from "react";

const DirectDetails = (props) => {
    console.log(props)
    return (
        <div className="col-lg-12" style={{textAlign:"center"}}>
            <Tag color={"green"}>{props.property}:{props.propertyData.toString()}</Tag>
        </div>
    )
}

export default DirectDetails