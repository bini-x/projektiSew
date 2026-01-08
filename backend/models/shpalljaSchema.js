const mongoose = require("mongoose");

const shpalljaSchema = new mongoose.Schema({
  emailKompanise: {
    type: String,
    required: true,
  },
  pozitaPunes: {
    type: String,
    required: true,
  },
  kategoriaPunes: {
    type: String,
    enum: [
      "administrate",
      "it",
      "dizajner",
      "infermieri",
      "edukim",
      "shitje dhe marketing",
    ],
    required: true,
  },
  lokacioniPunes: {
    type: String,
    required: true,
  },
  pershkrimiPunes: {
    type: String,
    required: true,
  },
  pyetjet: {
    type: [String],
  },
  niveliPunes: {
    type: String,
    enum: [
      "",
      "praktike",
      "fillestar",
      "junior",
      "mid-level",
      "senior",
      "lider",
      "menaxher",
      "drejtor",
    ],
    required: false,
    default: "",
  },
  orari: {
    type: [String],
    enum: ["", "fulltime", "part-time"],
    required: false,
    default: [],
  },
  eksperienca: {
    type: String,
    required: false,
  },
  pagaPrej: {
    type: Number,
    required: true,
  },
  pagaDeri: {
    type: Number,
    required: true,
  },
  numriAplikimeve: {
    type: Number,
    default: 0,
  },
  dataKrijimit: {
    type: Date,
    default: Date.now,
  },
});

const Shpallja = mongoose.model("Shpallja", shpalljaSchema, "shpalljet");
module.exports = Shpallja;
