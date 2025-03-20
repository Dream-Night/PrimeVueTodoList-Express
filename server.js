{/* const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const PORT = 3000;

app.use(mylogger);
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.status(500).json({ msg: "Error Happend!"});
});

app.use("/user", userRouter);

function mylogger(req, res, next) {
    console.log(req.originalURL);
    next();
}
    // get post put delete

app.listen(PORT, () => console.log("Set up server!")); */}

const express = require("express");
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors({
    origin: 'http://localhost:5175',
    optionsSuccessStatus: 200
}))

app.use(express.json());

let tasks = [
    { id: 1, title: "temp01", status: { id: 0, value: "notStarted", display: "Not Started" }, name: { id: 0, value: "NO_NAME"}, deadline: "2025/08/01", deadlineTime: "22:00", details: "this is for my friend", priority: { id: 2, value: "Daily" }, cost: { id: 1, value: "1 day", day: 1 }, temp: '' },
    { id: 2, title: "temp02", status: { id: 0, value: "notStarted", display: "Not Started" }, name: { id: 0, value: "NO_NAME"}, deadline: "2025/09/02", deadlineTime: "22:30", details: "", priority: { id: 2, value: "Daily" }, cost: { id: 0, value: "1 h", day: 0 }, temp: '' },
];

app.get("/tasks", (req, res) => {
    console.log("GET /task called");
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    console.log("Received request:", req.body);
    const { title, status, name, deadline, deadlineTime, details, priority, cost, temp } = req.body;

    if (!title || !status) {
        return res.status(400).json({ error: "Title or status was empty" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        status,
        name,
        deadline,
        deadlineTime,
        details,
        priority,
        cost,
        temp,
    };
    console.log(newTask);
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    // const { updateType } = req.body;
    const { title, status, name, deadline, deadlineTime, details, priority, cost, temp } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    tasks[taskIndex] = { id: taskId, title, status, name, deadline, deadlineTime, details, priority, cost, temp };

    res.json(tasks[taskIndex]);

    console.log(tasks[taskId]);

   /* if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
    } */

    // if ( status /* updateType === 'typeUpdateStatus' */) {

        /* const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        const { title, deadline, deadlineTime, details} = tasks[taskIndex];

        tasks[taskIndex] = { id: taskId, title, status, deadline, deadlineTime, details };

        res.json(tasks[taskIndex]); */

    // }  else if ( details /* updateType === 'typeUpdateDetails' */) {

        /* const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        const { title, status, deadline, deadlineTime } = tasks[taskIndex];

        tasks[taskIndex] = { id: taskId, title, status, deadline, deadlineTime, details };

        console.log(tasks[taskIndex]);
        
        res.json(tasks[taskIndex]);
    } */
}); 

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    console.log(taskId + " " + taskIndex + " " + tasks);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

app.listen(port, () => {
    console.log("server setuped");
});