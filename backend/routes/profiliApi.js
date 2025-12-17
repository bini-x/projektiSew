const express = require("express");
const router = express.Router();
const Perdorues = require("../models/perdoruesSchema");

router.get("/:id", async (req, res) => {
  try {
    const perdoruesi = await Perdorues.findById(req.params.id);

    if (!perdoruesi) {
      return res.status(404).json({
        success: false,
        message: "Perdoruesi nuk u gjet",
      });
    }

    return res.status(200).json({
      success: true,
      data: perdoruesi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Gabim i brendshem",
    });
  }
});

module.exports = router;
