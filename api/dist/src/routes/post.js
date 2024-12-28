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
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("../config/storage");
const auth_1 = require("../middleware/auth");
const upload = (0, multer_1.default)({ storage: storage_1.storage });
const router = express_1.default.Router();
router.post("/create", upload.single('media'), auth_1.authenticate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.createPost)(req, res, next);
}));
router.get("/all", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.getPosts)(req, res, next);
}));
router.get("/byAuthor", auth_1.authenticate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.getPostsByAuthor)(req, res, next);
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.getPostById)(req, res, next);
}));
router.delete("/:id", (0, validation_1.grabPostByIdValidation)(), auth_1.authenticate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, post_1.deletePost)(req, res, next);
}));
exports.default = router;
