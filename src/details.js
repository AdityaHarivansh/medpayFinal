import { CloseSquareFilled, CloseSquareOutlined } from "@ant-design/icons";
import { Card, Divider, Tag } from "antd";
import React, { useState } from "react";
import CardDetails from "./cardDetails";

const Details = (props) => {

    //Variable Decalrations
    const [cardIndex, setCardIndex] = useState(null)
    const [filteredData, setFilteredData] = useState(props.dateData)
    const [filterValue, setFilterValue] = useState(null)

    //to set the filter according to which the cards will be filtered
    const setFilter = (value) => {
        setFilterValue(value)
        if (value === "is_potentially_hazardous_asteroid") {
            setFilteredData( filteredData.filter((curr) => {
                console.log(curr[value])
                return curr[value] === true
            }))
        }
        else if (value === "is_sentry_object") {
            setFilteredData(filteredData.filter((curr) => {
                return curr[value] === true
            }))
        }
        else if (value === "magnitude") {
            setFilteredData(filteredData.filter((curr) => {
                return curr["absolute_magnitude_h"]>20
            }))
        }
        else{
            setFilteredData(props.dateData)
        }
    }
    return (
        <div>
            {
                cardIndex && (
                    <div>
                        <div className="row justify-content-md-center" id="main-card">
                            <div className="col-lg-12">
                                <p style={{ float: "right", cursor: "pointer" }} onClick={() => {setCardIndex(null)}}><CloseSquareOutlined color="white" /></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <CardDetails data={props.dateData[cardIndex]} />
                            </div>
                        </div>
                        <Divider />
                    </div>

                )
            }
            {<div className='row'>
                <div className='col-lg-4'>
                    <Tag style={{cursor:"pointer"}} color={filterValue === "is_potentially_hazardous_asteroid"?"Red":"red"} onClick={() => {filterValue === "is_potentially_hazardous_asteroid"?setFilter(null):setFilter("is_potentially_hazardous_asteroid")}}>Hazardous</Tag>
                </div>
                <div className='col-lg-4'>
                    <Tag style={{cursor:"pointer"}} color={filterValue === "is_sentry_object"?"Red":"red"} onClick={() => {filterValue === "is_sentry_object"?setFilter(null):setFilter("is_sentry_object")}}>Sentry</Tag>
                </div>
                <div className='col-lg-4'>
                    <Tag style={{cursor:"pointer"}} color={filterValue === "magnitude"?"Red":"red"} onClick={() => {filterValue === "magnitude"?setFilter(null):setFilter("magnitude")}}>{`Magnitude>20`}</Tag>
                </div>
                <Divider />
            </div>
            }

            <div className="row">
                {filteredData && filteredData.map((acc, i) => {
                    return (
                        <div className="col-lg-4">
                            <a href="#main-card">
                            <Card title={acc.name} style={{ marginTop: "1rem", cursor: "pointer" }} onClick={() => setCardIndex(i)}>
                                <p>Id : {acc.id}</p>
                                <p>Neo Reference Id : {acc.neo_reference_id}</p>
                                <p>Absolute Magnitude : {acc.absolute_magnitude_h}</p>
                                <p>Potentially Hazardous : <Tag color={acc.is_potentially_hazardous_asteroid ? "Red" : "Green"} >{acc.is_potentially_hazardous_asteroid ? "Yes" : "No"}</Tag></p>
                                <p>Sentry Object : <Tag color={acc.is_sentry_object ? "Red" : "Green"} >{acc.is_sentry_object ? "Yes" : "No"}</Tag></p>
                            </Card>
                            </a>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}
export default Details