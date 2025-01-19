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
const validation_1 = require("../middleware/validation");
const comment_1 = require("../controllers/comment");
const router = express_1.default.Router();
router.post("/create", (0, validation_1.createCommentValidation)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, comment_1.createComment)(req, res, next);
}));
router.delete("/:commentId", (0, validation_1.getCommentByIdValidation)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, comment_1.deleteComment)(req, res, next);
}));
exports.default = router;
