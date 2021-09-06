"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Required External Modules
 */
var dotenv = __importStar(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var debug_1 = __importDefault(require("debug"));
var body_parser_1 = __importDefault(require("body-parser"));
var expressWinston = __importStar(require("express-winston"));
var winston_1 = __importDefault(require("winston"));
// @ts-ignore
var CartRoutes_1 = require("./src/routes/CartRoutes");
// @ts-ignore
var connection_1 = __importDefault(require("./src/utilities/database/connection"));
var typeorm_1 = require("typeorm");
var ProductRoutes_1 = require("./src/routes/ProductRoutes");
dotenv.config();
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.setConfig();
    }
    App.prototype.setConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, PORT, app, routes, loggerOptions;
            return __generator(this, function (_a) {
                info = debug_1.default('app');
                PORT = parseInt(process.env.PORT, 10);
                app = express_1.default();
                routes = [];
                //Middleware used to enable cors
                app.use(cors_1.default());
                app.use(express_1.default.json());
                app.use(body_parser_1.default.json());
                loggerOptions = {
                    transports: [new winston_1.default.transports.Console()],
                    format: winston_1.default.format.combine(winston_1.default.format.json(), winston_1.default.format.prettyPrint(), winston_1.default.format.colorize({ all: true })),
                };
                app.use(expressWinston.logger(loggerOptions));
                routes.push(new CartRoutes_1.CartRoutes(app));
                routes.push(new ProductRoutes_1.ProductRoutes(app));
                /**
                 * Server & DB Activation
                 */
                typeorm_1.createConnection(connection_1.default)
                    .then(function (_connection) {
                    _connection.runMigrations();
                })
                    .catch(function (err) {
                    console.log("Unable to connect to db", err);
                    process.exit(1);
                });
                routes.forEach(function (route) {
                    console.log("Routes configured for " + route.name);
                });
                app.listen(PORT, function () {
                    console.log("Server is running on port, " + PORT);
                });
                return [2 /*return*/];
            });
        });
    };
    return App;
}());
// Singleton Class: On start up, instantiates class.
exports.default = new App().app;