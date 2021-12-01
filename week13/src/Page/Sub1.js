import React,{useEffect, useState} from "react";
import { createGlobalStyle } from 'styled-components';
import "../subComponent/Sub1.css";
import SubChart from "../subComponent/SubChart";
import { useParams } from 'react-router';
import axios from "axios";

const Sub1 = ({match}) => {
  const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
  `;
  const params = useParams();
  console.log(params);
  const [months, setMonths] = useState([
    {
      id:0,
      job:"",
      start: "2018-12-12",
      end: "2018-12-12",
      tot: 0
    },    {
      id:0,
      job:"",
      start: "2018-12-12",
      end: "2018-12-12",
      tot: 0
    }]
  );
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
        tot: (parseInt(Date.parse(RowDataPacket.end) - parseInt(Date.parse(RowDataPacket.start)))/6000/600)
      })
      )
      // ((Date.parse(months[0].end) - Date.parse(months[0].start))/6000/60)
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      setMonths(_inputData)
    } catch (e) {
      console.error(e.message)
    }
  }


  useEffect(()=>{
   getMonthSalary(); 
  },[])

  var k = 0;
  console.log(months.length)
  for(var q = 0; q < months.length; q ++){
  k += months[q].tot;
  }
  console.log(k)
  console.log(months[1].tot)
  console.log(typeof months[0].tot)
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
            +++ 계산기 +++ <br />
            시급: <input type="text" name="hourSal"></input> <br/>
            일한 시간: <input type="text" name="hourWork"></input> <br/>
            주간: <input type="checkbox"></input> 야간: <input type="checkbox"></input> <br />
           연장수당<input type="checkbox"></input> 주휴수당 <input type="checkbox"></input> <br />
           휴게시간 <input type="checkbox"></input><br />
           <input type="button" name="cal" value="계산하기" /> 
          </div>

        </div>

        <div className="job-detail-static">
        <SubChart/>
        </div>
      </div>
    </>
  );
}

export default Sub1;