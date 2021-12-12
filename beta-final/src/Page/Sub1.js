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
  const params = useParams();
  console.log(params);
  const [salary, setSalary] = useState(0);
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
          params: { 'job': params.subname }
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


  useEffect(() => {
    getMonthSalary();
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
  var k = 0;
  console.log(months.length)
  for (var q = 0; q < months.length; q++) {
    k += months[q].tot;
  }
  console.log(k)
  console.log(months[1].tot)
  console.log(typeof months[0].tot)

  const {workDay, hourPay, hourWork, moreWork, day, night, holidayPay, restTime, restCheck}= calculator;
  const onClick = e=> {
    console.log("휴개시간 계산:"+ (calculator.restTime * calculator.hourPay * calculator.workDay))
    var a = calculator.hourPay * calculator.hourWork;
    a += calculator.hourPay * calculator.moreWork * 1.5; 
    a = a - (calculator.restTime * calculator.hourPay * calculator.workDay);
    if(dayToggle == true){
    } else if(nightToggle == true){
      a = a * 1.5;
    }
    if(holidayPayToggle == true){
      a+= a/calculator.workDay;
    }
      setSalary(a);
  }

  const onChange = e =>{
    const {name, value} = e.target;
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
            시급: {params.subpay}<br />
            주급: {k * params.subpay}/4<br />
            월급: {k * params.subpay}<br />
            주간: <input type="checkbox"></input> 야간: <input type="checkbox"></input> <br />
            연장수당<input type="checkbox"></input> 주휴수당 <input type="checkbox"></input> <br />
            휴게시간 <input type="checkbox"></input><br />
          </div>

          <div className="job-detail">
            <div style={{display:"flex", flexDirection:"row"}}>
              <div>
                알바 월급 계산기<br />
                근무일: <input type="text" name="workDay" onChange={onChange}></input> <br />
                시급: <input type="text" name="hourPay" onChange={onChange}></input> <br />
                정규근무 시간: <input type="text" name="hourWork" onChange={onChange}></input> <br />
                연장근무 시간: <input type="text" name="moreWork" onChange={onChange}></input> <br />
                주간: <input type="checkbox" name="day" onChange={onDayToggle}></input> 야간: <input type="checkbox" name="night" onChange={onNightToggle}></input> <br />
                주휴수당 <input type="checkbox" name="holidayPay"onChange={onHolidayPayToggle}></input> <br />
                휴게시간 <input type="text" name="restTime"/>
                <input type="button" name="cal" value="계산하기" onClick={onClick} />
              </div>
              <div style={{textAlign:"center"}}>
                {salary.toString()}
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