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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.getAllStudents = void 0;
var getAllStudents = function (pool) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let resp = {
                data: undefined,
                error: true,
                message: "Something went wrong"
            };
            pool.query('SELECT name,email,phone,avatar,enrollnumber,dateofadmission FROM "student" ', (error, results) => {
                if (!error && !results.rows[0]) {
                    resp = {
                        error: true,
                        message: "No student available"
                    };
                    reject(resp);
                    return;
                }
                if (error) {
                    resp = {
                        error: true,
                        message: error.message
                    };
                    reject(resp);
                }
                else {
                    var student_list = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        const res_obj = {
                            name: results.rows[i].name,
                            email: results.rows[i].email,
                            phone: results.rows[i].phone,
                            avatar: results.rows[i].avatar,
                            enrollnumber: results.rows[i].enrollnumber,
                            dateofadmission: results.rows[i].dateofadmission
                        };
                        student_list.push(res_obj);
                    }
                    resp = {
                        data: student_list,
                        error: false,
                        message: "Student list fetched"
                    };
                }
                resolve(resp);
            });
        });
    });
};
exports.getAllStudents = getAllStudents;
var deleteStudent = function (pool, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let resp = {
                data: undefined,
                error: true,
                message: "Something went wrong"
            };
            pool.query('DELETE FROM student  WHERE name=$1', [name], (error, results) => {
                if (error) {
                    resp = {
                        error: true,
                        message: error.message
                    };
                    reject(resp);
                }
                else {
                    resp = {
                        data: results.rows[0],
                        error: false,
                        message: "Student deleted successfully"
                    };
                }
                resolve(resp);
            });
        });
    });
};
exports.deleteStudent = deleteStudent;
