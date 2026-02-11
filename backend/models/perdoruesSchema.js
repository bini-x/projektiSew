const mongoose = require("mongoose");

const perdoruesSchema = new mongoose.Schema(
  {
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
    punetRuajtura: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shpallja",
      },
    ],
    foto: {
      emriFoto: {
        type: String,
        required: false,
      },
      mimetype: {
        type: String,
        required: false,
      },
      size: {
        type: Number,
        required: false,
      },
      data: {
        type: Buffer,
        required: false,
      },
      uploadDate: {
        type: Date,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Perdorues = mongoose.model("Perdorues", perdoruesSchema, "perdoruesit");
module.exports = Perdorues;
