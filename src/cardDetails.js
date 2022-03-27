import { type } from "@testing-library/user-event/dist/type";
import { Card, Tag } from "antd";
import React, { useState } from "react";
import DirectDetails from "./directDetails";
import ObjectDetails from "./objectDetails";

const CardDetails = (props) => {

    //Variable Declarations
    const [property, setProperty] = useState(null)
    const [mainData, setMainData] = useState(props.data)

    //to get property from children and re-render this component
    const getProperty = (value) => {
        // console.log(value)
        setProperty(value)
    }

    //to get the data to which the above property belongs from children
    const getMainData = (value) => {
        // console.log(value)
        setMainData(value)
    }
    console.log("***",mainData,property)
    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <Card title={props.data.name} style={{ marginTop: "1rem" }}>
                        {/* <div className="row"> */}
                            {
                                //Check if the property has direct value
                                !props.data[property]?(property && typeof mainData[property] != "object" &&
                                <DirectDetails property={property} propertyData={mainData[property]} />)
                                :
                                (property && typeof props.data[property] != "object" &&
                                <DirectDetails property={property} propertyData={props.data[property]} />)
                            }
                            {
                                //Check if the property has array value
                                !props.data[property]?(property && Array.isArray(mainData[property]) &&
                                <ObjectDetails objectData={props.data[property][0]} mainData={mainData[property][0]} getProperty={getProperty} getMainData={getMainData} color={"green"} />)                            
                                :
                                (property && Array.isArray(props.data[property]) &&
                                <ObjectDetails objectData={props.data[property][0]} mainData={props.data[property][0]} getProperty={getProperty} getMainData={getMainData} color={"green"} />)
                            }
                            {
                                //Check if the property has object value
                                !props.data[property]?(property && !Array.isArray(mainData[property]) && typeof mainData[property] === "object" &&
                                <ObjectDetails objectData={mainData[property]} mainData={mainData[property]} getProperty={getProperty} getMainData={getMainData} color={"green"} />)
                                :
                                property && !Array.isArray(props.data[property]) && typeof mainData[property] === "object" &&
                                <ObjectDetails objectData={mainData[property]} mainData={props.data[property]} getProperty={getProperty} getMainData={getMainData} color={"green"} />
                            }
                        {/* </div> */}

                        <div className="row">
                            <ObjectDetails objectData={props.data} mainData={props.data} getProperty={getProperty} getMainData={getMainData} color={"red"} />
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    )
}
export default CardDetails