const express = require("express");
const router = express.Router();
const upload = require("../upload");
const Aplikimi = require("../models/aplikimiSchema");
const Shpallja = require("../models/shpalljaSchema");
const dergoMesazhin = require("../emailservice");

router.post("/:id/aplikimi", upload.single("cvFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Ju lutem futni filen (PDF, DOC ose DOCX)",
      });
    }
    const {
      emailAplikantit,
      emriAplikantit,
      mbiemriAplikantit,
      eksperienca,
      niveliPunes,
      nrTelefonit,
      letraMotivuese,
    } = req.body;
    console.log(req.body);

    const shpalljaId = req.params.id;
    const shpallja = await Shpallja.findById(shpalljaId);

    const aplikimi = new Aplikimi({
      shpalljaId: shpallja._id,
      emailAplikantit,
      emriAplikantit,
      mbiemriAplikantit,
      eksperienca,
      niveliPunes,
      nrTelefonit,
      letraMotivuese,
      emriFileCv: req.file.originalname,
      mimetype: req.file.mimetype,
      filesize: req.file.size,
      data: req.file.buffer,
    });

    await aplikimi.save();
    await dergoMesazhin(
      emailAplikantit,
      "Aplikimi",
      "Aplikimi u dergua me sukses!",
    );

    return res.status(200).json({
      success: true,
      data: aplikimi,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        error: "Madhësia e file-it është shumë e madhe. Maksimumi 5MB",
      });
    }

    if (error.message && error.message.includes("Vetëm file-t PDF")) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      error: "Gabim i brendshem i serverit",
    });
  }
});

router.get("/aplikimet", async (req, res) => {
  try {
    const aplikimet = await Aplikimi.find();

    return res.status(200).json({
      success: true,
      data: aplikimet,
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
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Gabim i brendshem i serverit",
    });
  }
});

router.put("/aplikimi/:id", async (req, res) => {
  try {
    const aplikimi = await Aplikimi.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      data: aplikimi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Gabim i brendshem",
    });
  }
});

router.get("/:id/download", async (req, res) => {
  try {
    const aplikimi = await Aplikimi.findById(req.params.id);

    if (!aplikimi) {
      return res.status(404).json({
        success: false,
        error: "Aplikimi nuk u gjet",
      });
    }

    res.set({
      "Content-Type": aplikimi.mimetype,
      "Content-Disposition": `attachment; filename="${aplikimi.emriFileCv || "cv"}"`,
      "Content-Length": aplikimi.filesize,
      "Cache-Control": "no-cache",
    });

    res.send(aplikimi.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Gabim i brendshem",
    });
  }
});

module.exports = router;
