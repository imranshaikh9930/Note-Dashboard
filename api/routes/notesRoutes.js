const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {createNotes,getNotes,updateNotes,deleteNotes} = require("../controllers/notesController")
const router = express.Router();


router.post("/notes",verifyToken,createNotes);
router.get("/notes",verifyToken,getNotes);
router.put("/notes/:id",verifyToken,updateNotes);
router.delete("/notes/:id",verifyToken,deleteNotes);

module.exports = router;