const express = require("express");
const router = express.Router();
const Aplikimi = require("../models/aplikimiSchema");
const Perdorues = require("../models/perdoruesSchema");
const Shpallja = require("../models/shpalljaSchema");

router.post("/:id/aplikimi", async (req, res) => {
  try {
    const { emailAplikantit, emriAplikantit, mbiemriAplikantit } = req.body;
    console.log(req.body);

    const shpalljaId = req.params.id;
    const shpallja = await Shpallja.findById(shpalljaId);

    const aplikimi = new Aplikimi({
      shpalljaId: shpallja._id,
      emailAplikantit,
      emriAplikantit,
      mbiemriAplikantit,
    });

    await aplikimi.save();

    await Shpallja.findByIdAndUpdate(
      shpalljaId,
      { $inc: { numriAplikimeve: 1 } },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      data: aplikimi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Gabim i brendshem i serverit",
    });
  }
});

router.get("/:shpalljaId/aplikimet", async (req, res) => {
  try {
    const shpalljaId = req.params.shpalljaId;
    console.log("Shpallja id: ", shpalljaId);

    const shpallja = await Shpallja.findById(shpalljaId);
    if (!shpallja) {
      return res.status(404).json({
        success: false,
        error: "Shpallja nuk u gjet",
      });
    }

    const aplikimet = await Aplikimi.find({
      shpalljaId: shpalljaId,
    });

    return res.status(200).json({
      success: true,
      aplikimet,
      numriAplikimeve: shpallja.numriAplikimeve,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Gabim i brendshem i serverit",
    });
  }
});

module.exports = router;
