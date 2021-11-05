
    const express = require("express"); 
    const app = express();
    const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
    const cors = require("cors");
    const bodyParser = require("body-parser");
    const mysql = require("mysql"); // mysql 모듈 사용
    
    var connection = mysql.createConnection({
        host : "localhost",
        user : "root", //mysql의 id
        password : "1234", //mysql의 password
        database : "project", //사용할 데이터베이스
    });
    
    connection.connect();
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    
    app.post("/idplz", (req,res)=>{
        const test = req;
        // console.log(req.body);
        connection.query("INSERT INTO schedule values(?)",[test],
        function(err,rows,fields){
            if(err){
                console.log("실패");
                // console.log(err);
            }else{
                console.log("성공");
                // console.log(rows);
            };
        });
        
    });
    
    app.listen(port, ()=>{
        console.log(`Connect at http://localhost:${port}`);
    })

    app.get("/bringData", (req, res) => {
        connection.query("SELECT * FROM schedule", function (err, rows, fields) {
            if (err) {
                console.log("데이터 가져오기 실패");
            } else{
                console.log(rows);
                res.send(rows);
      }
    });

    app.post("/addData", (req,res)=>{
        const data = req.body;
        // console.log(req.body);
        console.log(data);
        
        connection.query("INSERT INTO schedule(job,start,end) values (? , ?, ?)",[data.job, data.start, data.end],
        function(err, rows, fielda){
            if(err){
                console.log("DB저장 실패");
                // console.log(err);
            }else{
                console.log("DB저장 성공");
                // console.log(rows);
            };
        });
        
        
    });

});