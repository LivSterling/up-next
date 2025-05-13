const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const suggestController = require("../../controllers/ai/suggest");
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

router.post("/generateSuggestions", upload.single("file"), suggestController.generateSuggestions);

module.exports = router;