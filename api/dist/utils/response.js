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
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { data, statusCode, message = 'Success', total } = payload;
    const response = Object.assign({ data,
        statusCode,
        message, status: "success" }, (total !== undefined && { total }));
    return res.status(statusCode).send(response);
});
exports.successResponse = successResponse;
const errorResponse = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { statusCode, message } = payload;
    return res
        .status(statusCode)
        .send({ status: "failure", statusCode, message, payload: [] });
});
exports.errorResponse = errorResponse;
