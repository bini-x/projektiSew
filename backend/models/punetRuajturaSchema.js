// backend/models/punetRuajturaSchema.js
const mongoose = require("mongoose");

const punetRuajturaSchema = new mongoose.Schema(
  {
    perdoruesiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perdorues",
      required: true,
    },
    shpalljaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shpallja",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create compound index to prevent duplicate saves
punetRuajturaSchema.index({ perdoruesiId: 1, shpalljaId: 1 }, { unique: true });

const PunetRuajtura = mongoose.model(
  "PunetRuajtura",
  punetRuajturaSchema,
  "punetRuajtura",
);
module.exports = PunetRuajtura;
