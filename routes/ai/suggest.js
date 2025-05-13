const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const suggestController = require("../../controllers/ai/suggest");
const mockupController = require('../../controllers/ai/mockup');
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

router.post("/generateSuggestions", upload.single("file"), suggestController.generateSuggestions);

router.post('/generateMockup', mockupController.generateMockup);

module.exports = router;