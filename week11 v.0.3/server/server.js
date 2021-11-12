
const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host: "localhost",
    user: "root", //mysql의 id
    password: "1234", //mysql의 password
    database: "project", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/idplz", (req, res) => {
    const test = req;
    // console.log(req.body);
    connection.query("INSERT INTO schedule values(?)", [test],
        function (err, rows, fields) {
            if (err) {
                console.log("실패");
                // console.log(err);
            } else {
                console.log("성공");
                // console.log(rows);
            };
        });
});

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})

app.get("/bringData", (req, res) => {
    connection.query("SELECT * FROM schedule", function (err, rows, fields) {
        if (err) {
            console.log("데이터 가져오기 실패");
        } else {
            console.log(rows);
            res.send(rows);
        }
    });

    app.post("/addData", (req, res) => {
        const data = req.body;
        // console.log(req.body);
        console.log(data);

        connection.query("INSERT INTO schedule(job,start,end) values (? , ?, ?)", [data.job, data.start, data.end],
            function (err, rows, fielda) {
                if (err) {
                    console.log("DB저장 실패");
                    // console.log(err);
                } else {
                    console.log("DB저장 성공");
                    // console.log(rows);
                };
            });
    });

    app.post("/deleteData", (req, res) => {
        const data = req.body;
        console.log("노드로 넘어옴");
        console.log(data);

        connection.query("DELETE FROM schedule WHERE id = ?", [data.id],
            function (err, rows, fields) {
                if (err) {
                    console.log("DB삭제 실패");
                    // console.log(err);
                } else {
                    console.log("DB삭제 성공");
                    // console.log(rows);
                };
            });
    });
});

app.post("/editData", (req, res) => {
    const data = req.body;
    console.log("노드로 넘어옴");
    console.log(data);

    connection.query("UPDATE schedule SET job = ?, start = ?, end = ? WHERE id = ?", [data.job, data.start, data.end, data.id],
        function (err, rows, fields) {
            if (err) {
                console.log("DB수정 실패");
                // console.log(err);
            } else {
                console.log("DB수정 성공");
                // console.log(rows);
            };
        });
});

app.get("/bringJobData", (req, res) => {
    connection.query("SELECT * FROM job_table", function (err, rows, fields) {
        if (err) {
            console.log("데이터 가져오기 실패");
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
})

app.post("/addJobData", (req, res) => {
    const data = req.body;
    // console.log(req.body);
    console.log(data);

    connection.query("INSERT INTO job_table(job,location,pay) values (? , ?, ?)", [data.job, data.location, data.pay],
        function (err, rows, fielda) {
            if (err) {
                console.log(" job_table DB저장 실패");
                // console.log(err);
            } else {
                console.log("job_table DB저장 성공");
                // console.log(rows);
            };
        });
});

app.post("/editJobData", (req, res) => {
    const data = req.body;
    console.log("노드로 넘어옴");
    console.log(data);
    
    connection.query("UPDATE job_table SET location = ?, pay = ? WHERE id = ?", [data.location,data.pay, data.id],
        function (err, rows, fields) {
            if (err) {
                console.log("DB수정 실패");
                console.log(err.message);
            } else {
                console.log("DB수정 성공");
                // console.log(rows);
            };
        });
});

app.post("/deleteJobData", (req, res) => {
    const data = req.body;
    console.log("노드로 넘어옴");
    console.log(data);

    connection.query("DELETE FROM job_table WHERE id = ?", [data.id],
        function (err, rows, fields) {
            if (err) {
                console.log(" job_table DB삭제 실패");
                // console.log(err);
            } else {
                console.log("job_table DB삭제 성공");
                // console.log(rows);
            };
        });
});

app.get("/bringTodoData", (req, res) => {

    const sql = "SELECT * FROM todo_table WHERE Date(todo_date) = Date(?)";
    const params = req.query.Fdate;
    connection.query(sql, params, (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            res.send(err)
        }
    })
})

app.post("/addTodoData", (req, res) => {
    const data = req.body;
    // console.log(req.body);
    console.log(data);

    connection.query("INSERT INTO todo_table(todo_date, todo_title, todo_check) values (?, ?, ?)", [data.date, data.text, data.checked],
        function (err, rows, fields) {
            if (err) {
                console.log(" todo_table DB저장 실패");
                // console.log(err);
            } else {
                console.log("todo_table DB저장 성공");
                // console.log(rows);
            };
        });
});

app.post("/deleteTodoData", (req, res) => {
    const data = req.body;
    console.log("노드로 넘어옴");
    console.log(data.id);

    connection.query("DELETE FROM todo_table WHERE todo_id = ?", [data.id],
        function (err, rows, fields) {
            if (err) {
                console.log(" job_table DB삭제 실패");
                // console.log(err);
            } else {
                console.log("job_table DB삭제 성공");
                // console.log(rows);
            };
        });
});

// app.get("/bringTimelineData", (req, res) => {

//     const sql = "SELECT * FROM timeline_table WHERE Date(job) = ?";
//     const params = req.query.Fdate;
//     console.log("파라미터값은 ??? " + params)
//     connection.query(sql, params, (err, rows, fields) => {
//         if (!err) {
//             res.send(rows)
//             console.log(rows);
//         } else {
//             res.send(err)
//         }
//     })
// })

    // const data = req.body;
    // console.log("넘어온 데이터:::"+data)
    // console.log("넘어온 데이터의 타입 :::" + data)
    // connection.query("SELECT * FROM todo_table", function (err, rows, fields) {
    //     if (err) {
    //         console.log("데이터 가져오기 실패");
    //     } else {
    //         console.log(rows);
    //         res.send(rows);
    //     }
    //     });
    // })