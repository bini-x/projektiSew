const mongoose = require("mongoose");

const perdoruesSchema = new mongoose.Schema({
  tipiPerdoruesit: {
    type: String,
    enum: ["aplikant", "punedhenes"],
  },
  emri: {
    type: String,
    required: function () {
      return this.tipiPerdoruesit === "aplikant";
    },
  },
  mbiemri: {
    type: String,
    required: function () {
      return this.tipiPerdoruesit === "aplikant";
    },
  },
  kompania: {
    type: String,
    required: function () {
      return this.tipiPerdoruesit === "punedhenes";
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fjalekalimi: {
    type: String,
    required: true,
  },
  nrTelefonit: {
    type: Number,
    required: false,
  },
});

const Perdorues = mongoose.model("Perdorues", perdoruesSchema, "perdoruesit");
module.exports = Perdorues;
