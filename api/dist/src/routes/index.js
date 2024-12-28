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
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
const comment_1 = __importDefault(require("./comment"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use("/user", user_1.default);
// router.use("/tag", TagRoutes);
router.use("/post", post_1.default);
router.use("/comment", auth_1.authenticate, comment_1.default);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        status: 200,
        message: 'Welcome to Dhaniel Service',
    });
}));
exports.default = router;
