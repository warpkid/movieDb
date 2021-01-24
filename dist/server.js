"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const movieController_1 = __importDefault(require("./controllers/movieController"));
const app = new app_1.default([new movieController_1.default()], 5000);
app.listen();
//# sourceMappingURL=server.js.map