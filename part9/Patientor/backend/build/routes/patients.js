"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const patients_1 = __importDefault(require("../services/patients"));
const utils_1 = __importDefault(require("../utils"));
const router = express.Router();
router.get("/", (_request, response) => {
    const data = patients_1.default.getEntries();
    return response.send(data);
});
router.get("/:id", (request, response) => {
    const id = request.params.id;
    const data = patients_1.default.findById(id);
    if (data)
        return response.send(data);
    else
        return response.sendStatus(404);
});
router.post("/", (request, response) => {
    //   const { name, dateOfBirth, ssn, gender, occupation } = request.body;
    try {
        const newEntry = (0, utils_1.default)(request.body);
        const addedEntry = patients_1.default.addEntry(newEntry);
        response.json(addedEntry);
    }
    catch (error) {
        let errorMsg = "Something occured: ";
        if (error instanceof Error) {
            errorMsg += error.message;
        }
        response.json({ error: errorMsg });
    }
});
exports.default = router;
