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
const post_1 = require("../controllers/post");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post("/create", (0, validation_1.createPostValidation)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.createPost)(req, res, next);
}));
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.getPosts)(req, res, next);
}));
router.get("/:postId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.getPostById)(req, res, next);
}));
router.delete("/:postId", (0, validation_1.grabPostByIdValidation)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.deletePost)(req, res, next);
}));
exports.default = router;
