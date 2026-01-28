// backend/routes/punetRuajturaApi.js
const express = require("express");
const router = express.Router();
const PunetRuajtura = require("../models/punetRuajturaSchema");

// Ruaj një shpallje
router.post("/ruaj/:shpalljaId", async (req, res) => {
  try {
    const { shpalljaId } = req.params;
    const { perdoruesiId } = req.body; // Get user ID from request body

    if (!perdoruesiId) {
      return res.status(401).json({
        success: false,
        message: "Perdoruesi nuk është i kyçur",
      });
    }

    // Kontrollo nëse është ruajtur më parë
    const ekziston = await PunetRuajtura.findOne({
      perdoruesiId: perdoruesiId,
      shpalljaId: shpalljaId,
    });

    if (ekziston) {
      return res.status(400).json({
        success: false,
        message: "Shpallja është ruajtur më parë",
      });
    }

    const puneRuajtur = new PunetRuajtura({
      perdoruesiId: perdoruesiId,
      shpalljaId: shpalljaId,
    });

    await puneRuajtur.save();

    return res.status(201).json({
      success: true,
      message: "Shpallja u ruajt me sukses",
      data: puneRuajtur,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gabim gjatë ruajtjes",
      error: err.message,
    });
  }
});

// Hiq ruajtjen e një shpallje
router.delete("/hiq/:shpalljaId", async (req, res) => {
  try {
    const { shpalljaId } = req.params;
    const { perdoruesiId } = req.body; // Get user ID from request body

    if (!perdoruesiId) {
      return res.status(401).json({
        success: false,
        message: "Perdoruesi nuk është i kyçur",
      });
    }

    const rezultati = await PunetRuajtura.findOneAndDelete({
      perdoruesiId: perdoruesiId,
      shpalljaId: shpalljaId,
    });

    if (!rezultati) {
      return res.status(404).json({
        success: false,
        message: "Shpallja e ruajtur nuk u gjet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Shpallja u hoq nga të ruajturat",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gabim gjatë heqjes",
      error: err.message,
    });
  }
});

// Merr të gjitha shpalljet e ruajtura për një përdorues
router.get("/shpalljet-e-ruajtura/:perdoruesiId", async (req, res) => {
  try {
    const { perdoruesiId } = req.params;

    if (!perdoruesiId) {
      return res.status(401).json({
        success: false,
        message: "Perdoruesi nuk është i kyçur",
      });
    }

    const shpalljetRuajtura = await PunetRuajtura.find({
      perdoruesiId: perdoruesiId,
    })
      .populate("shpalljaId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: shpalljetRuajtura,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gabim gjatë marrjes së shpalljeve",
      error: err.message,
    });
  }
});

// Kontrollo nëse një shpallje është e ruajtur
router.get("/eshte-ruajtur/:shpalljaId/:perdoruesiId", async (req, res) => {
  try {
    const { shpalljaId, perdoruesiId } = req.params;

    if (!perdoruesiId) {
      return res.status(200).json({
        success: true,
        eshteRuajtur: false,
      });
    }

    const ruajtur = await PunetRuajtura.findOne({
      perdoruesiId: perdoruesiId,
      shpalljaId: shpalljaId,
    });

    return res.status(200).json({
      success: true,
      eshteRuajtur: !!ruajtur,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gabim gjatë kontrollit",
      error: err.message,
    });
  }
});

module.exports = router;
