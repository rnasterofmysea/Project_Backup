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
import Connect from "./component/Connect";
//import EventInsert from "./component/EventInsert";

SwiperCore.use([Navigation, Pagination, Autoplay])

const App =() =>{

  const [insertToggle, setInsertToggle] = useState(false);
  
  const onInsertToggle = () => {
    setInsertToggle(prev => !prev);
  }

  // const onInsertEvent = () =>{
  //   if()
  // }
  const [pr, Setpr] = useState();
  fetch("http://localhost:3001/data", { 
    method: "post", //통신방법
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      Setpr({
        data: json.id,
      });
    });

  const [events, SetEvents] = useState([
    {
      id: 1,
      job: 'event 1',
      start: '2021-10-26T10:00',
      end: '2021-10-27T12:00'
    },
    {
      id: 2,
      job: 'event 2',
      start: '2021-06-16T13:00',
      end: '2021-06-16T18:00'
    },
  ])

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
          events={events}
          eventColor= "#20c997"
          nowIndicator
          dateClick={(e) => console.log(e.dateStr)}
          eventClick={(e) => console.log(e.event.id)}
          />
        </div>
        <div>
          test
          
        </div>
        {/* 이벤트 추가 핸들러 작성 v0.1 */}
        {/* {insertToggle && <EventInsert events = {events} onInsertToggle = {onInsertToggle}/>} */}
      </div>
  </div>
  </div>
);
}

export default App;