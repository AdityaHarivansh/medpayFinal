import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { DatePicker, Form, Button, Skeleton, Divider,Tag } from 'antd';
import moment from 'moment'
import { useEffect, useState } from 'react';
import Details from './details';
import CardDetails from './cardDetails';
import { Lines } from 'react-preloaders'
import background from './background.jpg'
import background1 from './background1.jpg'

const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'

const App = () => {

  //Variable Decalarations
  const [dataLoaded, setDataLoaded] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const [inputDate, setInputDate] = useState([])
  const [disabledButton, setDisabledButton] = useState("self")
  const [selectedDate, setSelectedDate] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filteredData,setFilteredData]=useState(null)
  const [filterValue,setFilterValue]=useState(null)
  const [heightAdjust,setHeightAdjust]=useState('100vh')
  const [form] = Form.useForm()

  //Invoke this function on hit of search button to call the API
  const onFinish = (value) => {
    // setIsLoading(true)
    setDataLoaded(false)
    console.log(value)
    setSelectedDate(null)
    setInputDate([new Date(value.date[0]), new Date(value.date[1])])
    console.log(new Date(new Date(value.date[0]).setDate(new Date(value.date[0]).getDate()+1)))
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${new Date(new Date(value.date[0]).setDate(new Date(value.date[0]).getDate()+1)).toISOString().slice(0, 10)}&end_date=${new Date(new Date(value.date[1]).setDate(new Date(value.date[1]).getDate()+1)).toISOString().slice(0, 10)}&api_key=${'1eMZWBpyCemFxfm4GKkzbvfNlmpWtQtP42I2X1b4'}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setDataLoaded(true)
        setApiResponse(data)
        // setFilteredData(data)
        // localStorage.setItem("response", JSON.parse(data))
        setIsLoading(false)
      })
  }

  //Invoke this function to call the next or prev dates
  const callDiff = (value) => {
    setDisabledButton("")
    setDataLoaded(false)
    setApiResponse({})
    setSelectedDate(null)
    fetch(apiResponse.links[value])
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setDataLoaded(true)
        setApiResponse(data)
        // setFilteredData(data)
        setDisabledButton(value)
        localStorage.setItem("response", JSON.parse(data))
      })
  }

  
  console.log(isLoading)
  return (
    <div className="App" style={{height:"100vh",textAlign:"center",backgroundImage: `url(${background})`,height:heightAdjust,
    // marginTop:'-70px',
    // fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'}}>
      <div className='row justify-content-md-center' style={{width:"100%"}}>
        <div className='col-lg-8'>
          <div className="card" style={{flex:1,justifyContent:"center",textAlign:"center",backgroundImage: `url(${background1})`,height:'100%',
    // marginTop:'-70px',
    // fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',}}>
            <div className="card-header card-header-flex">
              <div className="d-flex flex-column justify-content-center mr-auto">
                <h5 className="mb-0">Nasa</h5>
              </div>
            </div>

            <div className='card-body'>
              <Form onFinish={onFinish} form={form}>
                <div className='row' style={{textAlign:"center"}}>

                  <div className='col-lg-6'>
                    <Form.Item name="date" label='Date Range(range<7)'>
                      <RangePicker format={dateFormat} disabled={disabledButton != "self"} />
                    </Form.Item>
                  </div>
                  <div className='col-lg-6' style={{textAlign:"left"}}>
                    <Form.Item>
                      <Button type='primary' htmlType="submit">
                        Search
                      </Button>
                    </Form.Item>
                  </div>
                </div>

              </Form>

              <Divider />

              {dataLoaded &&

                <div className='row'>
                  <div className='col-lg-4'>
                    <Button type='primary' onClick={() => callDiff("prev")} disabled={disabledButton === "prev"}>
                      Previous
                    </Button>
                  </div>
                  <div className='col-lg-4'>
                    <Button type='primary' onClick={() => callDiff("self")} disabled>
                      Self
                    </Button>
                  </div>
                  <div className='col-lg-4'>
                    <Button type='primary' onClick={() => callDiff("next")} disabled={disabledButton === "next"}>
                      Next
                    </Button>
                  </div>
                </div>}
              { isLoading?
                  (inputDate.length?<p>Please wait while the data is loading</p>:<p>Please Enter the Dates to fetch the Data</p>)
                  :
                  <div className='row justify-content-md-center'>
                  <Divider />

                    {apiResponse && apiResponse.near_earth_objects && Object.keys(apiResponse.near_earth_objects).map((key) => {
                      return (
                        <div className='col-lg-4' style={{ marginTop: "1rem" }}>
                          <Button onClick={() => {setSelectedDate(key)
                          setHeightAdjust('100%')}} style={{color:key==selectedDate?"green":"blue",border:key==selectedDate?"green 1px solid":"blue 1px solid"}}>
                            {key} : {apiResponse.near_earth_objects[key].length}
                          </Button>
                        </div>
                      )
                    })}
                  <Divider />
                  </div>
              }
              
              {
                selectedDate && apiResponse.near_earth_objects && <Details dateData={apiResponse.near_earth_objects[selectedDate]} />
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
