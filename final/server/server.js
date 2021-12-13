
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
app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})


app.post("/Login", (req, res) => {
    const params = req.query;
    connection.query("SELECT user_type FROM user_table WHERE user_id = ? AND user_pw = ?", [params.id,
    params.pw], function (err, data) {

        if (!err) {
            if (data.length >= 1) {
                console.log("로그인 성공");
                res.send(data)
            }
            else {
                console.log("계정 없음");
            }
        } else {
            console.log("로그인 실패");
            res.send(err)
        }
    })
})

app.post("/SignIn", (req, res) => {
    const params = req.query;
    connection.query("INSERT INTO user_table(user_id ,user_pw, user_type) VALUE(?,?,'user')", [params.id,
    params.pw], function (err, rows, fields) {

        if (!err) {
            console.log("회원가입 성공");
            res.send(rows)
        } else {
            console.log("회원가입 실패");
            res.send(err)
        }
    })
})


app.post("/editAcount", (req, res) => {
    const params = req.query;
    console.log(req.query)
    connection.query("UPDATE user_table SET user_pw =? WHERE user_id = ?", [params.pw, params.id],
        function (err, rows, fields) {
            if (err) {
                console.log("DB수정 실패");
                res.send(err)
            } else {
                console.log("DB수정 성공");
                res.send(rows)
            };
        });
});



app.get("/bringData", (req, res) => {
    const params = req.query;
    connection.query("SELECT * FROM schedule where user_id=?", [params.user_id], function (err, rows, fields) {
        if (err) {
            console.log("데이터 가져오기 실패");
        } else {
            console.log(params.user_id);
            res.send(rows);
        }
    });

    app.post("/addData", (req, res) => {
        const data = req.body;
        // console.log(req);

        connection.query("INSERT INTO schedule(user_id, job,start,end) values (?,?,?,?)", [data.user_id, data.job, data.start, data.end],
            function (err, rows, fielda) {
                if (err) {
                    console.log("DB저장 실패");
                    console.log(err);
                } else {
                    console.log("DB저장 성공");
                    // console.log(rows);
                };
            });
    });

    app.post("/deleteData", (req, res) => {
        const data = req.body;

        connection.query("DELETE FROM schedule WHERE id = ? AND user_id = ?", [data.id, data.user_id],
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

    connection.query("UPDATE schedule SET job = ?, start = ?, end = ? WHERE id = ? AND user_id = ?", [data.job, data.start, data.end, data.id, data.user_id],
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
    const params = req.query;
    connection.query("SELECT * FROM job_table where user_id = ?", [params.user_id], function (err, rows, fields) {
        if (err) {
            console.log("데이터 가져오기 실패");
        } else {
            console.log(rows);
            res.send(rows);
        }
    });
})

app.post("/addJobData", (req, res) => {
    const data = req.query;
    // console.log(req.body);
    console.log("addJobData ::")
    console.log(data)
    connection.query("INSERT INTO job_table(job,location,pay, user_id) values (? , ?, ?, ?)", [data.job, data.location, data.pay, data.user_id],
        function (err, rows, fielda) {
            if (err) {
                console.log(" job_table DB저장 실패");
                console.log(err);
            } else {
                console.log("job_table DB저장 성공");
                // console.log(rows);
            };
        });
});

app.post("/editJobData", (req, res) => {
    const data = req.body;

    connection.query("UPDATE job_table SET location = ?, pay = ? WHERE id = ? AND user_id = ?", [data.location, data.pay, data.id, data.user_id],
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

    connection.query("DELETE FROM job_table WHERE id = ? AND user_id = ?", [data.id, data.user_id],
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

    const params = req.query.Fdate;
    const params2 = req.query.user_id;
    connection.query("SELECT * FROM todo_table WHERE Date(todo_date) = Date(?) AND user_id = ?",
        [params, params2],
        function (err, rows, fields) {
            if (!err) {
                res.send(rows)
            } else {
                res.send(err)
            }
        })
})

app.post("/addTodoData", (req, res) => {
    const data = req.body;
    // console.log(req.body);s

    connection.query("INSERT INTO todo_table(user_id, todo_date, todo_title, todo_check) values (?, ?, ?, ?)", [data.user_id, data.date, data.text, data.checked],
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
    connection.query("DELETE FROM todo_table WHERE todo_id = ? and user_id=?", [data.id, data.user_id],
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

app.get("/bringTimelineData", (req, res) => {
    const params = req.query;
    connection.query("SELECT * FROM timeline_table WHERE Time(timeline_time) >= CAST(? AS TIME) AND Time(timeline_time) <= CAST(? AS TIME)"
        + "AND timeline_job = ? AND (user_id=? OR user_type='admin')", [params.start,
        params.end, params.job, params.user_id], function (err, rows, fields) {

            if (!err) {
                res.send(rows)
                console.log("timeline data 는")
                console.log(rows)
            } else {
                res.send(err)
            }
        })
})

app.post("/addTimelineData", (req, res) => {
    const data = req.body;
    // console.log(req.body);
    console.log(data);

    connection.query("INSERT INTO timeline_table" +
        "(user_id, timeline_job, timeline_title, timeline_text,timeline_time, timeline_checked, user_type)" +
        "values (?, ? , ?, ?, ?, ?,?)", [data.user_id, data.job, data.title, data.text, data.time, data.checked, data.user_type],
        function (err, rows, fielda) {
            if (err) {
                console.log(" timeline_table DB저장 실패");
                // console.log(err);
            } else {
                console.log("timeline_table DB저장 성공");
                // console.log(rows);
            };
        });
});

app.post("/editTimelineData", (req, res) => {
    const data = req.body;
    console.log("노드로 넘어옴");
    console.log(data);

    connection.query("UPDATE timeline_table SET timeline_title = ?, timeline_time = ?," +
        " timeline_text = ?, timeline_checked = ? WHERE timeline_id = ?", [data.title, data.time, data.text, data.checked, data.id],
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

app.post("/deleteTimelineData", (req, res) => {
    const data = req.body;

    connection.query("DELETE FROM timeline_table WHERE timeline_id = ?", [data.id],
        function (err, rows, fields) {
            if (err) {
                console.log(" timeline_table DB삭제 실패");
                // console.log(err);
            } else {
                console.log("timeline_table DB삭제 성공");
                // console.log(rows);
            };
        });
});

app.post("/ToggleData", (req, res) => {
    const data = req.body;
    console.log("노드로 넘어옴");
    console.log(data);
    console.log(typeof data.checked)
    connection.query("UPDATE timeline_table SET timeline_checked = ? WHERE timeline_id = ?", [data.checked, data.id],
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

app.get("/getMonthSalary", (req, res) => {

    const sql = "SELECT * FROM schedule WHERE user_id = ? AND job = ? AND YEAR(start) = year(NOW()) AND MONTH(start) = MONTH(NOW())";
    const params1 = req.query.id;
    const params2 = req.query.job;
    connection.query(sql, [params1,params2], (err, rows, fields) => {
        if (!err) {
            console.log(" job_table DB저장 성공");
            res.send(rows)
        } else {
            console.log(" job_table DB저장 실패");
            res.send(err)
        }
    })
})

app.get("/getWeekSalary", (req, res) => {

    const sql = "SELECT * FROM schedule WHERE job = ? AND YEAR(start) = year(NOW()) AND MONTH(start) = MONTH(NOW()) AND WEEK(start) = WEEK(NOW())";
    const params = req.query.job;
    connection.query(sql, params, (err, rows, fields) => {
        if (!err) {
            console.log(" job_table DB저장 성공");
            res.send(rows)
        } else {
            console.log(" job_table DB저장 실패");
            res.send(err)
        }
    })
})
