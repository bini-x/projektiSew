const express = require("express");
const router = express.Router();
const Perdorues = require("../models/perdoruesSchema");
const Shpallja = require("../models/shpalljaSchema");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const perdoruesi = await Perdorues.findById(id);

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

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const perdoruesiVjeter = await Perdorues.findById(id);

    const perdoruesi = await Perdorues.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (
      perdoruesiVjeter.tipiPerdoruesit === "punedhenes" &&
      updateData.email &&
      updateData.email !== perdoruesiVjeter.email
    ) {
      await Shpallja.updateMany(
        { emailKompanise: perdoruesiVjeter.email },
        { $set: { emailKompanise: updateData.email } },
      );
    }

    res.status(200).json({
      success: true,
      message: "U modifikua me sukses",
      data: perdoruesi,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Gabim i brendshem i serverit",
    });
  }
});

module.exports = router;
