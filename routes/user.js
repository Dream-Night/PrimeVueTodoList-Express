const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User");
});
router.get("/info", (req, res) => {
    res.send("User Info");
});

router.get("/:id",(req, res) => {
    res.send(`${req.params.id} is gotted`);
});

module.exports = router;

