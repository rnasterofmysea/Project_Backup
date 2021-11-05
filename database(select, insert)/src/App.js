import React, { useState, useEffect } from "react";
import "./App.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination,Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventInsert from "./component/EventInsert";

import axios from "axios"

SwiperCore.use([Navigation, Pagination, Autoplay])

const App =() =>{

  const [insertToggle, setInsertToggle] = useState(false);
  
  useEffect(() => {
    axios.get('http://localhost:3001/bringData')
      .then(response =>{
        console.log(response)
      });
  },[]);


  const [inputData, setInputData] = useState([{
    id: 0,
    job: '',
    start: '',
    end: ''
  }])

  const onInsertToggle = () => {
    setInsertToggle(prev => !prev);
  }

  // const [events, SetEvents] = useState([
  //   {
  //     id: 1,
  //     job: 'event 1',
  //     start: '2021-10-26T10:00',
  //     end: '2021-10-27T12:00'
  //   },
  //   {
  //     id: 2,
  //     job: 'event 2',
  //     start: '2021-06-16T13:00',
  //     end: '2021-06-16T18:00'
  //   },
  // ])

    // await 를 사용하기 위해 async선언
    useEffect(()=>{
      async function fetchMine(){
      try{
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
        const res = await axios.get('http://localhost:3001/bringData')
        // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
        // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
        const _inputData = res.data.map((RowDataPacket) => ({
                id: RowDataPacket.id,
                job: RowDataPacket.job,
                start: RowDataPacket.start,
                end: RowDataPacket.end,
              })
        )
        // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
        setInputData(inputData.concat(_inputData))
      } catch(e){
        console.error(e.message)
      }
      }
      fetchMine()
    },[])


return(
  <div>
  <div className="head"> 아르바이트 일정 관리 프로그램</div>

  <div className = "body">
    <div className = "Statistics">

      </div>
    <div className = "Job-Template">
      
    <Swiper
        className="banner"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{delay: 1000}}
      >
        <SwiperSlide>아르바이트 목록1</SwiperSlide>
        <SwiperSlide>아르바이트 목록2</SwiperSlide>
        <SwiperSlide>아르바이트 목록3</SwiperSlide>
        <SwiperSlide>아르바이트 목록4</SwiperSlide>
      </Swiper>

    </div>
    <div className = "Calender-Template">
      <div className = "Calender">
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
              click: () => onInsertToggle()
            },
          }}
          events={inputData}
          eventColor= "#20c997"
          nowIndicator
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={(e) => console.log(e.event.id)}
          />

        </div>
        <div>
          test
          
        </div>
        이벤트 추가 핸들러 작성 v0.1
        {insertToggle && <EventInsert  onInsertToggle = {onInsertToggle}/>}
        
      </div>
  </div>
  </div>
);
}

export default App;