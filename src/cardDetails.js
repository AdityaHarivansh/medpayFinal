import { type } from "@testing-library/user-event/dist/type";
import { Card, Tag } from "antd";
import React, { useState } from "react";
import DirectDetails from "./directDetails";
import ObjectDetails from "./objectDetails";

const CardDetails = (props) => {
    const [property, setProperty] = useState(null)
    const [mainData, setMainData] = useState(props.data)

    const getProperty = (value) => {
        // console.log(value)
        setProperty(value)
    }

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
                                !props.data[property]?(property && typeof mainData[property] != "object" &&
                                <DirectDetails property={property} propertyData={mainData[property]} />)
                                :
                                (property && typeof props.data[property] != "object" &&
                                <DirectDetails property={property} propertyData={props.data[property]} />)
                            }
                            {
                                !props.data[property]?(property && Array.isArray(mainData[property]) &&
                                <ObjectDetails objectData={props.data[property][0]} mainData={mainData[property][0]} getProperty={getProperty} getMainData={getMainData} color={"green"} />)                            
                                :
                                (property && Array.isArray(props.data[property]) &&
                                <ObjectDetails objectData={props.data[property][0]} mainData={props.data[property][0]} getProperty={getProperty} getMainData={getMainData} color={"green"} />)
                            }
                            {
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