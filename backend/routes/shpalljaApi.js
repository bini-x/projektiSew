const express = require("express");
const router = express.Router();
const Shpallja = require("../models/shpalljaSchema");

router.get("/kompania", async (req, res) => {
  try {
    const shpalljet = await Shpallja.find().sort({ dataKrijimit: -1 });
    return res.status(200).json({
      success: true,
      data: shpalljet,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gabim i brendshem",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const shpallja = await Shpallja.findById(req.params.id);

    if (!shpallja) {
      return res.status(404).json({
        success: false,
        message: "Shpallja u gjet",
      });
    }

    return res.status(200).json({
      success: true,
      data: shpallja,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gabim i serverit",
    });
  }
});

router.get("/:id/aplikimi", async (req, res) => {
  try {
    const shpallja = await Shpallja.findById(req.params.id);

    if (!shpallja) {
      return res.status(404).json({
        success: false,
        message: "Shpallja u gjet",
      });
    }

    return res.status(200).json({
      success: true,
      data: shpallja,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Gabim i serverit",
    });
  }
});

router.post("/kompania", async (req, res) => {
  const {
    emailKompanise,
    pozitaPunes,
    kategoriaPunes,
    lokacioniPunes,
    pershkrimiPunes,
    pyetjet,
    niveliPunes,
    llojiPunesimit,
    eksperienca,
  } = req.body;

  console.log(
    emailKompanise,
    pozitaPunes,
    kategoriaPunes,
    lokacioniPunes,
    pershkrimiPunes,
    pyetjet,
    niveliPunes,
    llojiPunesimit,
    eksperienca,
  );

  const shpallja = new Shpallja({
    emailKompanise,
    pozitaPunes,
    kategoriaPunes,
    lokacioniPunes,
    pershkrimiPunes,
    pyetjet: pyetjet || [],
    niveliPunes,
    llojiPunesimit,
    eksperienca,
  });

  const shpalljaPunes = await shpallja.save();

  return res.status(200).json({
    success: true,
    message: "puna u shpall me sukses",
    data: shpalljaPunes,
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const shpallja = await Shpallja.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "U fshi me sukses",
      data: shpallja,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Gabim i brendshem i serverit",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const shpallja = await Shpallja.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "U modifikua me sukses",
      data: shpallja,
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
