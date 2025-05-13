const express = require("express");
const router = express.Router();
const mockupController = require("../../controllers/ai/mockup");
const { ensureAuth, ensureGuest } = require("../../middleware/auth");

router.post("/generateMockup", mockupController.generateMockup);

module.exports = router;