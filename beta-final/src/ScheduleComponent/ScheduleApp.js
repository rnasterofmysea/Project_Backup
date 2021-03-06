import React, { useState, useEffect } from "react";
import { createGlobalStyle } from 'styled-components';
import "./ScheduleApp.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/swiper-bundle.css"
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ScheduleInsert from "./ScheduleInsert";
import ScheduleEdit from "./ScheduleEdit";
import JobDelete from "./JobDelete";
import JobInsert from "./JobInsert";
import { TiPencil } from "react-icons/ti";
import axios from "axios";
import Chart from "./Chart";
import moment from "moment";
import queryString from "query-string"

SwiperCore.use([Navigation, Pagination, Autoplay])

const ScheduleApp = ({
  setDate,
  setEvent,
  user_id }) => {

  const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }`
  
  const [ScheduleToggle, setScheduleToggle] = useState(false);
  const [ScheduleInsertToggle, setScheduleInsertToggle] = useState(false);
  const [JobEditToggle, setJobEditToggle] = useState(true);
  const [editID, SetEditID] = useState();
  const [change, setChange] = useState(false);
  
  // useEffect(() => {
  //   axios.get('http://localhost:3001/bringData')
  //     .then(response => {
  //       console.log(response)
  //     });
  // }, []);
  const [inputSchedule, setInputSchedule] = useState([{
    user_id:'',
    id: 0,
    title: '',
    start: '',
    end: ''
  }])
  const [inputJob, setInputJob] = useState([{
    user_id:'',
    id: 0,
    job: '',
    location: '',
    pay: ''
  }])
  const onChangeToggle = () => {
    setChange(prev => !prev);
  }

  const onScheduleToggle = () => {
    setScheduleToggle(prev => !prev);
  }

  const onScheduleInsertToggle = () => {
    setScheduleInsertToggle(prev => !prev);
  }
  const onJobEditToggle = () => {
    setJobEditToggle(prev => !prev);
  }
  useEffect(() => {
    // addSchedule()
    addJob()
  }, [], [])

  useEffect(() => {
    addSchedule()
  }, [change])


  async function addSchedule() {
    try {
      // ???????????? ???????????? ?????? ????????? ??????????????? await ??? ??????
      const res = await axios('http://localhost:3001/bringData',{
        method: "Get",
        params: {
            user_id: user_id,
        },
        hearders: new Headers()
      })
      // ????????? ???????????? ?????? ????????? ???????????? ?????? await ??? ??????
      // ????????? ???????????? map ????????? rowData ?????? _inputData ??????
      const _inputData = res.data.map((RowDataPacket) => ({
        user_id: RowDataPacket.user_id,
        id: RowDataPacket.id,
        title: RowDataPacket.job,
        start: RowDataPacket.start,
        end: RowDataPacket.end,
      })
      )
      // ????????? _inputData ??? ?????? ????????? inputData ??? concat ?????? ??????
      setInputSchedule(_inputData)
    } catch (e) {
      console.error(e.message)
    }
  }

  async function addJob() {
    try {
      // ???????????? ???????????? ?????? ????????? ??????????????? await ??? ??????
      const res = await axios.get('http://localhost:3001/bringJobData',{
        method: "Get",
        params: {
            user_id: user_id
        },
        hearders: new Headers()
      })
      // ????????? ???????????? ?????? ????????? ???????????? ?????? await ??? ??????
      // ????????? ???????????? map ????????? rowData ?????? _inputData ??????
      const _inputData = res.data.map((RowDataPacket) => ({
        user_id: RowDataPacket.user_id,
        id: RowDataPacket.id,
        job: RowDataPacket.job,
        location: RowDataPacket.location,
        pay: RowDataPacket.pay,
      })
      )
      // ????????? _inputData ??? ?????? ????????? inputData ??? concat ?????? ??????
      setInputJob(_inputData)
    } catch (e) {
      console.error(e.message)
    }
  }

  async function editJobData(id, location, pay) {
    console.log("????????? ??????");
    const res = await axios("http://localhost:3001/editJobData", {
      method: "POST",
      data: {
        user_id: user_id,
        id: parseInt(id),
        location: location,
        pay: parseInt(pay)
      },
      hearders: new Headers()
    })
    if (res.data) {
      console.log("????????? ??????");
      return window.location.reload();
    }
    else {
      console.log("????????? ?????? ??????");
    }
  }
  const onSubmit = e => {
    // e.preventDefault();
    editJobData(e.target.id.value, e.target.location.value, e.target.pay.value)
    console.log(e.target.id.value, e.target.location.value, e.target.pay.value)
    onJobEditToggle();
  }
  // await ??? ???????????? ?????? async??????
  return (
    <>
      <GlobalStyle />
      <div>
        <div className="head">
          <div className="headFont">
            ????????????(????????????) - ????????? ????????? ?????? ?????? <button onClick={()=> window.open("/Sub1?id=&name=kdh","",
            "_blank")}>adsfd</button>
          </div>
        </div>

        <div className="body">

          <div className="Schedule-Template">
            <div className="ScheduleLeft">
              <div className="Calendar">
              {ScheduleInsertToggle && <ScheduleInsert onInsertToggle={onScheduleInsertToggle} onChangeToggle={onChangeToggle} user_id={user_id}/>}

              {ScheduleToggle && <ScheduleEdit onScheduleToggle={onScheduleToggle} editID={editID} onChangeToggle={onChangeToggle} user_id={user_id} />}
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  center: 'dayGridMonth,timeGridWeek,timeGridDay new',
                }}
                customButtons={{
                  new: {
                    text: 'new',
                    // click: () => console.log('new event'),
                    click: () => {
                      onScheduleInsertToggle()
                    }
                  },
                }}
                events={inputSchedule}
                displayEventTime={false}
                
                eventColor="#20c997"
                nowIndicator
                dateClick={(e) => {
                  console.log(e.dateStr)
                  setDate(e.date)
                  setEvent({
                    job: "",
                    start: "",
                    end: " "
                  })
                }}
                eventClick={(e) => {
                  console.log(e.event.id)
                  onScheduleToggle()
                  SetEditID(e.event.id)
                  setEvent({
                    job: e.event.title,
                    start: moment(new Date(Date.parse(e.event.start))).format("kk:mm:ss"),
                    end: moment(new Date(Date.parse(e.event.end))).format("kk:mm:ss"),
                  })
                  setDate(e.event.start)
                }}
                />
                </div>
            </div>

            <div className="ScheduleRight">

              <div className="Calender-Event">
              </div>
              <div className="Job-Template">
                <Swiper
                  className="banner"
                  height={250}
                  spaceBetween={50}
                  slidesPerView={3}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                >
                  {
                    inputJob.map((index) =>
                      <SwiperSlide key={index.id} className='swiper-slide'>
                        <div className="swiper-wrapper">
                          <div className="jobItem">
                            <div className="jobItemTitle">
                            <button onClick={()=> window.open("/Sub1/"+index.id+"/"+index.job+"/"+index.pay)}>{index.job}</button>
                          <JobDelete delID={index.id} user_id={user_id} /> <button onClick={onJobEditToggle}> <TiPencil /></button></div>
                            {JobEditToggle && <div className="jobItemItem">
                              <div>??????: {index.location}</div>
                              <div>??????: {index.pay}</div>
                            </div>}
                            <form onSubmit={onSubmit}>
                              {!JobEditToggle && <div className="jobItemITem">
                                <input type="hidden" name="id" value={index.id}></input>
                                <div>??????: <input type="text" name="location" placeholder={index.location} ></input></div>
                                <div>??????: <input type="text" name="pay" placeholder={index.pay} ></input></div>
                                <button type="submit"> ??????</button>
                              </div>}
                            </form>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  }
                  <SwiperSlide className='swiper-slide'>
                    <div className="jobItem">
                      <JobInsert user_id = {user_id}/>
                    </div>
                  </SwiperSlide>
                </Swiper>

              </div>

              <div className="Static-Template">
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default ScheduleApp;