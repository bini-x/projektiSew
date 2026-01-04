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
      "Administrate",
      "IT",
      "Dizajner",
      "Infermieri",
      "Edukim",
      "Shitje dhe Marketing",
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
      "Praktike",
      "Fillestar",
      "Junior",
      "Mid-Level",
      "Senior",
      "Lider",
      "Menaxher",
      "Drejtor",
    ],
    required: false,
    default: "",
  },
  llojiPunesimit: {
    type: String,
    enum: ["", "fulltime", "parttime", "contract", "temporary", "internship"],
    required: false,
    default: "",
  },
  dataKrijimit: {
    type: Date,
    default: Date.now,
  },
});

const Shpallja = mongoose.model("Shpallja", shpalljaSchema, "shpalljet");
module.exports = Shpallja;
