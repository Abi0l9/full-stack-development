"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const diagnoses_1 = __importDefault(require("../services/diagnoses"));
const router = express.Router();
router.get("/", (_request, response) => {
    const data = diagnoses_1.default.getEntries();
    return response.send(data);
});
exports.default = router;
