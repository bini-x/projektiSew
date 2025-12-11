const express = require("express");
const router = express.Router();
const Shpallja = require("../models/shpalljaSchema");

router.get("/kerko", async (req, res) => {
  try {
    const { kerko, lokacioniPunes, kategoriaPunes } = req.query;
    const filter = {};

    if (kerko) {
      filter.$or = [
        { pozitaPunes: { $regex: kerko, $options: "i" } },
        { pershkrimiPunes: { $regex: kerko, $options: "i" } },
      ];
    }

    if (lokacioniPunes) {
      filter.lokacioniPunes = lokacioniPunes;
    }

    if (kategoriaPunes) {
      filter.kategoriaPunes = kategoriaPunes;
    }

    const shpalljetKerkuara = await Shpallja.find(filter);

    return res.status(200).json({
      success: true,
      data: shpalljetKerkuara,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Gabim i brendshem i serverit",
    });
  }
});

module.exports = router;
