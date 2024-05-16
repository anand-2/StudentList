"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
require("dotenv").config();
const queries_1 = require("./queries");
const app = (0, express_1.default)();
var cors = require('cors');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(cors());
const port = 5000;
const pool = new pg_1.Pool({
    //  user: "studentlist_pob9_user",
    // host: "dpg-cp28upa1hbls739cn150-a.oregon-postgres.render.com",    
    // database: "studentlist_pob9",
    // password: "16UYgQju4PEK3DPGwJuxhMV0DTvQ69qk",
    // port: parseInt(process.env.DB_PORT || '5432')
    connectionString: "postgres://studentlist_pob9_user:16UYgQju4PEK3DPGwJuxhMV0DTvQ69qk@dpg-cp28upa1hbls739cn150-a.oregon-postgres.render.com/studentlist_pob9?ssl=true"
});
app.get("/student", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, queries_1.getAllStudents)(pool);
        res.send(data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.post("/deleteStudent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentName = yield req.body.name;
    try {
        const data = yield (0, queries_1.deleteStudent)(pool, studentName);
        res.send(data);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
app.listen(port, () => {
    console.log(`Api started at port ${port}`);
});
