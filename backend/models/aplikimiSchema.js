const mongoose = require("mongoose");

const aplikimiSchema = new mongoose.Schema({
  shpalljaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shpallja",
    required: true,
  },
  emriFileCv: {
    type: String,
    required: false,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: false,
  },
  data: {
    type: Buffer,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: false,
  },
  emailAplikantit: {
    type: String,
    required: true,
  },
  emriAplikantit: {
    type: String,
    required: true,
  },
  mbiemriAplikantit: {
    type: String,
    required: true,
  },
  eksperienca: {
    type: String,
    required: false,
  },
  niveliPunes: {
    type: String,
    required: false,
  },
  nrTelefonit: {
    type: Number,
    required: false,
  },
  letraMotivuese: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: [
      "pending",
      "reviewed",
      "accepted",
      "rejected",
      "interview_scheduled",
    ],
  },
  dataKrijimit: {
    type: Date,
    default: Date.now,
  },
});

const Aplikimi = mongoose.model("Aplikimi", aplikimiSchema, "aplikimet");
module.exports = Aplikimi;
