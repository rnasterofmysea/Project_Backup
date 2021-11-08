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
import ScheduleDelete from "./ScheduleDelete";
import ScheduleEdit from "./ScheduleEdit";
import JobDelete from "./JobDelete";
import JobInsert from "./JobInsert";
import JobEdit from "./JobEdit";
import axios from "axios";
import Chart from "./Chart";

SwiperCore.use([Navigation, Pagination, Autoplay])

const ScheduleApp = () => {

  const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

  const [ScheduleToggle, setScheduleToggle] = useState(false);
  const [ScheduleInsertToggle, setScheduleInsertToggle] = useState(false);

  const [editID, SetEditID] = useState();
  useEffect(() => {
    axios.get('http://localhost:3001/bringData')
      .then(response => {
        console.log(response)
      });
  }, []);


  const [inputSchedule, setInputSchedule] = useState([{
    id: 0,
    title: '',
    start: '',
    end: ''
  }])
  const [inputJob, setInputJob] = useState([{
    id: 0,
    job: '',
    location: '',
    pay: ''
  }])

  const onScheduleToggle = () => {
    setScheduleToggle(prev => !prev);
  }

  const onScheduleInsertToggle = () => {
    setScheduleInsertToggle(prev => !prev);
  }

  async function addSchedule() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/bringData')
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.id,
        title: RowDataPacket.job,
        start: RowDataPacket.start,
        end: RowDataPacket.end,
      })
      )
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setInputSchedule(inputSchedule.concat(_inputData))
    } catch (e) {
      console.error(e.message)
    }
  }

  async function addJob() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/bringJobData')
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.id,
        job: RowDataPacket.job,
        location: RowDataPacket.location,
        pay: RowDataPacket.pay,
      })
      )
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setInputJob(inputJob.concat(_inputData))
    } catch (e) {
      console.error(e.message)
    }
  }

  // await 를 사용하기 위해 async선언
  useEffect(() => {
    addSchedule()
    addJob()
  }, [])

  return (
    <>
      <GlobalStyle />
      <div>
        <div className="head">
          <div className="headFont">
            아르바이트 관리 프로그램
          </div>
        </div>

        <div className="body">

          <div className="Schedule-Template">
            <div className="ScheduleLeft">
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
                    click: () => onScheduleInsertToggle()
                  },
                }}
                events={inputSchedule}
                displayEventTime={false}

                eventColor="#20c997"
                nowIndicator
                dateClick={(e) => console.log(e.dateStr)}
                eventClick={(e) => {
                  console.log(e.event.id)
                  onScheduleToggle()
                  SetEditID(e.event.id)
                }}
              />
            </div>

            <div className="ScheduleRight">

              <div className="Calender-Event">
                {ScheduleInsertToggle && <ScheduleInsert onInsertToggle={onScheduleInsertToggle} />}
                {ScheduleToggle && <ScheduleDelete onScheduleToggle={onScheduleToggle} editID={editID} />}
                {ScheduleToggle && <ScheduleEdit onScheduleToggle={onScheduleToggle} editID={editID} />}
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
                            <div className="jobItemTitle">{index.job} <JobDelete delID={index.id} /> <JobEdit /></div>
                            <div className="jobItemItem">
                              <div>장소: {index.location}</div>
                              <div>급여: {index.pay}</div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  }
                  <SwiperSlide className='swiper-slide'>
                    <div className="jobItem">
                      <JobInsert />
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