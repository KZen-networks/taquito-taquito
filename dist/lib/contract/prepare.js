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
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var utils_1 = require("@taquito/utils");
var michelson_encoder_1 = require("@taquito/michelson-encoder");
var format_1 = require("../format");
exports.createOriginationOperation = function (_a, publicKeyHash) {
    var code = _a.code, init = _a.init, _b = _a.balance, balance = _b === void 0 ? '0' : _b, _c = _a.spendable, spendable = _c === void 0 ? false : _c, _d = _a.delegatable, delegatable = _d === void 0 ? false : _d, delegate = _a.delegate, storage = _a.storage, _e = _a.fee, fee = _e === void 0 ? constants_1.DEFAULT_FEE.ORIGINATION : _e, _f = _a.gasLimit, gasLimit = _f === void 0 ? constants_1.DEFAULT_GAS_LIMIT.ORIGINATION : _f, _g = _a.storageLimit, storageLimit = _g === void 0 ? constants_1.DEFAULT_STORAGE_LIMIT.ORIGINATION : _g;
    return __awaiter(void 0, void 0, void 0, function () {
        var contractCode, contractStorage, schema, script, operation;
        return __generator(this, function (_h) {
            // tslint:disable-next-line: strict-type-predicates
            if (storage !== undefined && init !== undefined) {
                throw new Error('Storage and Init cannot be set a the same time. Please either use storage or init but not both.');
            }
            contractCode = Array.isArray(code) ? code : utils_1.ml2mic(code);
            if (storage !== undefined) {
                schema = new michelson_encoder_1.Schema(contractCode[1].args[0]);
                contractStorage = schema.Encode(storage);
            }
            else {
                contractStorage = typeof init === 'string' ? utils_1.sexp2mic(init) : init;
            }
            script = {
                code: Array.isArray(code) ? code : utils_1.ml2mic(code),
                storage: contractStorage,
            };
            operation = {
                kind: 'origination',
                fee: fee,
                gas_limit: gasLimit,
                storage_limit: storageLimit,
                balance: format_1.format('tz', 'mutez', balance).toString(),
                manager_pubkey: publicKeyHash,
                spendable: spendable,
                delegatable: delegatable,
                script: script,
            };
            if (delegate) {
                operation.delegate = delegate;
            }
            return [2 /*return*/, operation];
        });
    });
};
exports.createTransferOperation = function (_a) {
    var to = _a.to, amount = _a.amount, parameter = _a.parameter, _b = _a.fee, fee = _b === void 0 ? constants_1.DEFAULT_FEE.TRANSFER : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? constants_1.DEFAULT_GAS_LIMIT.TRANSFER : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? constants_1.DEFAULT_STORAGE_LIMIT.TRANSFER : _d, _e = _a.mutez, mutez = _e === void 0 ? false : _e, _f = _a.rawParam, rawParam = _f === void 0 ? false : _f;
    return __awaiter(void 0, void 0, void 0, function () {
        var operation;
        return __generator(this, function (_g) {
            operation = {
                kind: 'transaction',
                fee: fee,
                gas_limit: gasLimit,
                storage_limit: storageLimit,
                amount: mutez ? amount.toString() : format_1.format('tz', 'mutez', amount).toString(),
                destination: to,
            };
            if (parameter) {
                operation.parameters = rawParam
                    ? parameter
                    : typeof parameter === 'string'
                        ? utils_1.sexp2mic(parameter)
                        : parameter;
            }
            return [2 /*return*/, operation];
        });
    });
};
exports.createSetDelegateOperation = function (_a) {
    var delegate = _a.delegate, source = _a.source, _b = _a.fee, fee = _b === void 0 ? constants_1.DEFAULT_FEE.DELEGATION : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? constants_1.DEFAULT_GAS_LIMIT.DELEGATION : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? constants_1.DEFAULT_STORAGE_LIMIT.DELEGATION : _d;
    return __awaiter(void 0, void 0, void 0, function () {
        var operation;
        return __generator(this, function (_e) {
            operation = {
                kind: 'delegation',
                source: source,
                fee: fee,
                gas_limit: gasLimit,
                storage_limit: storageLimit,
                delegate: delegate,
            };
            return [2 /*return*/, operation];
        });
    });
};
exports.createRegisterDelegateOperation = function (_a, source) {
    var _b = _a.fee, fee = _b === void 0 ? constants_1.DEFAULT_FEE.DELEGATION : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? constants_1.DEFAULT_GAS_LIMIT.DELEGATION : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? constants_1.DEFAULT_STORAGE_LIMIT.DELEGATION : _d;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_e) {
            return [2 /*return*/, {
                    kind: 'delegation',
                    fee: fee,
                    gas_limit: gasLimit,
                    storage_limit: storageLimit,
                    delegate: source,
                }];
        });
    });
};
//# sourceMappingURL=prepare.js.map