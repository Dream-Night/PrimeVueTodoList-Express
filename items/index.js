const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
    { id: 1, title: "temp01", status: "NOT_STARTED", deadline: "", deadlineTime: "", details: "", priority: "WEEKLY", cost: "ONE_W" },
    { id: 2, title: "temp02", status: "NOT_STARTED", deadline: "", deadlineTime: "", details: "", priority: "DAILY", cost: "" },
];

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { title, status, deadline, deadlineTime, details, priority, cost } = req.body;

    if (!title || !status) {
        return res.status(400).json({ error: "Title or status was empty" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        status,
        deadline,
        deadlineTime,
        details,
        priority,
        cost
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, status } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks[taskIndex] = { id: taskId, title, status, deadline, deadlineTime, details, priority, cost };

    res.json(tasks[taskIndex]);
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

app.listen(3000, () => {
    console.log("saved!");
});