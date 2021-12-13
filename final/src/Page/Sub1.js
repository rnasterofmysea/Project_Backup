import React, { useEffect, useState } from "react";
import { createGlobalStyle } from 'styled-components';
import "../subComponent/Sub1.css";
import SubChart from "../subComponent/SubChart";
import { useParams } from 'react-router';
import axios from "axios";

const Sub1 = ({ match }) => {
  const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
  `;
  const title ={
    fontSize: "2.5vw",
    color: "#20c997",
    marginBottom: "1vw"
  }
  const item = {
    fontSize: "1.5vw",
    width:"50%"
  }
  const params = useParams();
  console.log(params);
  const [monthSalary, setMonthSalary] = useState(0);
  const [weekSalary, setWeekSalary] = useState(0);
  const [dayToggle, setDayToggle] = useState(false);
  const [nightToggle, setNightToggle] = useState(false);
  const [holidayPayToggle, setHolidayPayToggle] = useState(false);
  
  const [months, setMonths] = useState([
    {
      id: 0,
      job: "",
      start: "2018-12-12",
      end: "2018-12-12",
      tot: 0
    }, {
      id: 0,
      job: "",
      start: "2018-12-12",
      end: "2018-12-12",
      tot: 0
    }]
    );
    const [weeks, setWeeks] = useState([
      {
        id: 0,
        job: "",
        start: "2018-12-12",
        end: "2018-12-12",
        tot: 0
      }, {
        id: 0,
        job: "",
        start: "2018-12-12",
        end: "2018-12-12",
        tot: 0
      }]
      );
    
  const [calculator, setCalculator] = useState({
    workDay: 0,
    hourPay: 0,
    hourWork: 0,
    moreWork: 0,
    day: false,
    night: false,
    holidayPay: false,
    restTime: 0,
    restCheck: false
  })

  async function getMonthSalary() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/getMonthSalary'
        , {
          params: {
            'id': params.id,
            'job': params.subname
          }
        })
      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.id,
        job: RowDataPacket.job,
        start: RowDataPacket.start,
        end: RowDataPacket.end,
        tot: (parseInt(Date.parse(RowDataPacket.end) - parseInt(Date.parse(RowDataPacket.start))) / 6000 / 600)
      })
      )
      // ((Date.parse(months[0].end) - Date.parse(months[0].start))/6000/60)
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setMonths(_inputData)
    } catch (e) {
      console.error(e.message)
    }
  }

  async function getWeekSalary() {
    try {
      // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
      const res = await axios.get('http://localhost:3001/getWeekSalary'
        , {
          params: {
            'id': params.id,
            'job': params.subname
          }
        })
      const _inputData = res.data.map((RowDataPacket) => ({
        id: RowDataPacket.id,
        job: RowDataPacket.job,
        start: RowDataPacket.start,
        end: RowDataPacket.end,
        tot: (parseInt(Date.parse(RowDataPacket.end) - parseInt(Date.parse(RowDataPacket.start))) / 6000 / 600)
      })
      )
      // ((Date.parse(months[0].end) - Date.parse(months[0].start))/6000/60)
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setWeeks(_inputData)
    } catch (e) {
      console.error(e.message)
    }
  }
  var m = 0;
  console.log(months.length)
  for (var q = 0; q < months.length; q++) {
    m += months[q].tot;
  }

  var w = 0;
  console.log(months.length)
  for (var q = 0; q < weeks.length; q++) {
    w += weeks[q].tot;
  }

  useEffect(() => {
    getMonthSalary();
    getWeekSalary();
  }, [])

  const onDayToggle = (e) => {
    setDayToggle(prev => !prev);
  };
  const onNightToggle = (e) => {
    setNightToggle(prev => !prev);
  };
  const onHolidayPayToggle = (e) => {
    setHolidayPayToggle(prev => !prev);
  };



  const { workDay, hourPay, hourWork, moreWork, day, night, holidayPay, restTime, restCheck } = calculator;
  const onClick = e => {
    console.log("휴계시간 계산:" + (calculator.restTime * calculator.hourPay * calculator.workDay))
    var a = calculator.hourPay * calculator.hourWork;
    a += calculator.hourPay * calculator.moreWork * 1.5;
    a = a - (calculator.restTime * calculator.hourPay * calculator.workDay);
    if (dayToggle == true) {
    } else if (nightToggle == true) {
      a = a * 1.5;
    }
    if (holidayPayToggle == true) {
      a += a / calculator.workDay;
    }
    setMonthSalary(a);
  }

  const onChange = e => {
    const { name, value } = e.target;
    setCalculator({
      ...calculator,
      [name]: value,
    })
  }

  return (
    <>

      <GlobalStyle />
      <div className="head">
        <div className="headFont">
          {params.subname}
        </div>
      </div>

      <div className="body">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="job-detail">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={item}>
              <div style={title}> 급여 정보</div>
              <br />
                월간 업무시간: {m} 시간 <br /><br />
                시급: {params.subpay}<br /><br />
                주급: {w * params.subpay / 4}<br /><br />
                월급: {m * params.subpay}<br /><br />
              </div>
              <div  style={{fontSize:"3vw", marginTop:"4vh"}}>
                월급은
              <div style={{fontSize:"3vw", color:"#20c997"}}>
                {m * params.subpay} 원
              </div>
              입니다.
            </div>
              </div>
          </div>
          <div className="job-detail">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={item}>
                <div style={title}> 월급 계산기</div>
                근무일: <input type="number" name="workDay" onChange={onChange}  style={{width:"4vw"}}></input>일 <br />
                시급: <input type="number" name="hourPay" onChange={onChange}  style={{width:"4vw"}}></input>원 <br />
                정규근무 시간: <input type="number" name="hourWork" onChange={onChange}  style={{width:"4vw"}}></input>시간 <br />
                연장근무 시간: <input type="number" name="moreWork" onChange={onChange}  style={{width:"4vw"}}></input>시간 <br />
                주간: <input type="checkbox" name="day" onChange={onDayToggle}></input> 야간: <input type="checkbox" name="night" onChange={onNightToggle}></input> <br />
                주휴수당 <input type="checkbox" name="holidayPay" onChange={onHolidayPayToggle}></input> <br />
                휴게시간 <input type="number" name="restTime"  style={{width:"4vw"}}/>분<br /><br />
              </div>
              <div>
                <button onClick={onClick}> 계산하기</button>
                <div  style={{fontSize:"3vw", marginTop:"2vh"}}>
                월급은
              <div style={{fontSize:"3vw", color:"#20c997"}}>
              {monthSalary.toString()} 원
              </div>
              입니다.     
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-static">
          <SubChart />
        </div>
      </div>
    </>
  );
}

export default Sub1;