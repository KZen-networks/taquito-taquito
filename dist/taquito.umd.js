(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@taquito/indexer'), require('@taquito/rpc'), require('@taquito/signer'), require('@taquito/michelson-encoder'), require('rxjs'), require('rxjs/operators'), require('@taquito/utils'), require('bignumber.js')) :
    typeof define === 'function' && define.amd ? define(['exports', '@taquito/indexer', '@taquito/rpc', '@taquito/signer', '@taquito/michelson-encoder', 'rxjs', 'rxjs/operators', '@taquito/utils', 'bignumber.js'], factory) :
    (global = global || self, factory(global.taquito = {}, global.indexer, global.rpc, global.signer, global.michelsonEncoder, global.rxjs, global.operators, global.utils, global.BigNumber));
}(this, (function (exports, indexer, rpc, signer, michelsonEncoder, rxjs, operators, utils, BigNumber) { 'use strict';

    BigNumber = BigNumber && BigNumber.hasOwnProperty('default') ? BigNumber['default'] : BigNumber;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * @description Default signer implementation which does nothing and produce invalid signature
     */
    var NoopSigner = /** @class */ (function () {
        function NoopSigner() {
        }
        NoopSigner.prototype.publicKey = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, ''];
                });
            });
        };
        NoopSigner.prototype.publicKeyHash = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, ''];
                });
            });
        };
        NoopSigner.prototype.secretKey = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, ''];
                });
            });
        };
        NoopSigner.prototype.sign = function (bytes, _watermark) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            bytes: bytes,
                            sig: '',
                            prefixSig: '',
                            sbytes: bytes,
                        }];
                });
            });
        };
        return NoopSigner;
    }());

    var RpcForger = /** @class */ (function () {
        function RpcForger(context) {
            this.context = context;
        }
        RpcForger.prototype.forge = function (_a) {
            var branch = _a.branch, contents = _a.contents;
            return this.context.rpc.forgeOperations({ branch: branch, contents: contents });
        };
        return RpcForger;
    }());

    var RpcInjector = /** @class */ (function () {
        function RpcInjector(context) {
            this.context = context;
        }
        RpcInjector.prototype.inject = function (signedOperationBytes) {
            return this.context.rpc.injectOperation(signedOperationBytes);
        };
        return RpcInjector;
    }());

    var defaultConfig = {
        confirmationPollingIntervalSecond: 10,
        defaultConfirmationCount: 0,
        confirmationPollingTimeoutSecond: 180,
    };
    /**
     * @description Encapsulate common service used throughout different part of the library
     */
    var Context = /** @class */ (function () {
        function Context(_rpcClient, _signer, _proto, _config, forger, injector) {
            if (_rpcClient === void 0) { _rpcClient = new rpc.RpcClient(); }
            if (_signer === void 0) { _signer = new NoopSigner(); }
            this._rpcClient = _rpcClient;
            this._signer = _signer;
            this._proto = _proto;
            this._config = _config;
            this.config = _config;
            this._forger = forger ? forger : new RpcForger(this);
            this._injector = injector ? injector : new RpcInjector(this);
        }
        Object.defineProperty(Context.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (value) {
                this._config = __assign(__assign({}, defaultConfig), value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "rpc", {
            get: function () {
                return this._rpcClient;
            },
            set: function (value) {
                this._rpcClient = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "injector", {
            get: function () {
                return this._injector;
            },
            set: function (value) {
                this._injector = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "forger", {
            get: function () {
                return this._forger;
            },
            set: function (value) {
                this._forger = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "signer", {
            get: function () {
                return this._signer;
            },
            set: function (value) {
                this._signer = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "proto", {
            get: function () {
                return this._proto;
            },
            set: function (value) {
                this._proto = value;
            },
            enumerable: true,
            configurable: true
        });
        Context.prototype.isAnyProtocolActive = function (protocol) {
            if (protocol === void 0) { protocol = []; }
            return __awaiter(this, void 0, void 0, function () {
                var next_protocol;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._proto) return [3 /*break*/, 1];
                            return [2 /*return*/, protocol.includes(this._proto)];
                        case 1: return [4 /*yield*/, this.rpc.getBlockMetadata()];
                        case 2:
                            next_protocol = (_a.sent()).next_protocol;
                            return [2 /*return*/, protocol.includes(next_protocol)];
                    }
                });
            });
        };
        /**
         * @description Create a copy of the current context. Useful when you have long running operation and you do not want a context change to affect the operation
         */
        Context.prototype.clone = function () {
            return new Context(this.rpc, this.signer, this.proto, this.config, this.forger, this._injector);
        };
        return Context;
    }());

    (function (DEFAULT_GAS_LIMIT) {
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["DELEGATION"] = 10600] = "DELEGATION";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["ORIGINATION"] = 10600] = "ORIGINATION";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["TRANSFER"] = 10600] = "TRANSFER";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL"] = 10600] = "REVEAL";
    })(exports.DEFAULT_GAS_LIMIT || (exports.DEFAULT_GAS_LIMIT = {}));
    (function (DEFAULT_FEE) {
        DEFAULT_FEE[DEFAULT_FEE["DELEGATION"] = 1257] = "DELEGATION";
        DEFAULT_FEE[DEFAULT_FEE["ORIGINATION"] = 10000] = "ORIGINATION";
        DEFAULT_FEE[DEFAULT_FEE["TRANSFER"] = 10000] = "TRANSFER";
        DEFAULT_FEE[DEFAULT_FEE["REVEAL"] = 1420] = "REVEAL";
    })(exports.DEFAULT_FEE || (exports.DEFAULT_FEE = {}));
    (function (DEFAULT_STORAGE_LIMIT) {
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["DELEGATION"] = 0] = "DELEGATION";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["ORIGINATION"] = 257] = "ORIGINATION";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["TRANSFER"] = 300] = "TRANSFER";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["REVEAL"] = 300] = "REVEAL";
    })(exports.DEFAULT_STORAGE_LIMIT || (exports.DEFAULT_STORAGE_LIMIT = {}));
    (function (Protocols) {
        Protocols["Pt24m4xi"] = "Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd";
        Protocols["PsBABY5H"] = "PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95qb3m53QJiXGmrbU";
        Protocols["PsBabyM1"] = "PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS";
    })(exports.Protocols || (exports.Protocols = {}));
    var protocols = {
        '004': [exports.Protocols.Pt24m4xi],
        '005': [exports.Protocols.PsBABY5H, exports.Protocols.PsBabyM1],
    };

    var OperationEmitter = /** @class */ (function () {
        function OperationEmitter(context) {
            this.context = context;
        }
        Object.defineProperty(OperationEmitter.prototype, "rpc", {
            get: function () {
                return this.context.rpc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OperationEmitter.prototype, "signer", {
            get: function () {
                return this.context.signer;
            },
            enumerable: true,
            configurable: true
        });
        OperationEmitter.prototype.isSourceOp = function (op) {
            return ['transaction', 'origination', 'delegation'].includes(op.kind);
        };
        OperationEmitter.prototype.isFeeOp = function (op) {
            return ['reveal', 'transaction', 'origination', 'delegation'].includes(op.kind);
        };
        OperationEmitter.prototype.prepareOperation = function (_a) {
            var operation = _a.operation, source = _a.source;
            return __awaiter(this, void 0, void 0, function () {
                var counter, counters, requiresReveal, ops, head, blockHeaderPromise, blockMetaPromise, publicKeyHash, _b, counterPromise, managerPromise, i, counter_1, _c, header, metadata, headCounter, manager, haveManager, reveal, _d, proto005, constructOps, branch, contents, protocol;
                var _this = this;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            counters = {};
                            requiresReveal = false;
                            ops = [];
                            blockHeaderPromise = this.rpc.getBlockHeader();
                            blockMetaPromise = this.rpc.getBlockMetadata();
                            if (Array.isArray(operation)) {
                                ops = __spreadArrays(operation);
                            }
                            else {
                                ops = [operation];
                            }
                            _b = source;
                            if (_b) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1:
                            _b = (_e.sent());
                            _e.label = 2;
                        case 2:
                            publicKeyHash = _b;
                            counterPromise = Promise.resolve(undefined);
                            managerPromise = Promise.resolve(undefined);
                            i = 0;
                            _e.label = 3;
                        case 3:
                            if (!(i < ops.length)) return [3 /*break*/, 6];
                            if (!['transaction', 'origination', 'delegation'].includes(ops[i].kind)) return [3 /*break*/, 5];
                            requiresReveal = true;
                            return [4 /*yield*/, this.rpc.getContract(publicKeyHash)];
                        case 4:
                            counter_1 = (_e.sent()).counter;
                            counterPromise = Promise.resolve(counter_1);
                            managerPromise = this.rpc.getManagerKey(publicKeyHash);
                            return [3 /*break*/, 6];
                        case 5:
                            i++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, Promise.all([
                                blockHeaderPromise,
                                blockMetaPromise,
                                counterPromise,
                                managerPromise,
                            ])];
                        case 7:
                            _c = _e.sent(), header = _c[0], metadata = _c[1], headCounter = _c[2], manager = _c[3];
                            if (!header) {
                                throw new Error('Unable to latest block header');
                            }
                            if (!metadata) {
                                throw new Error('Unable to fetch latest metadata');
                            }
                            head = header;
                            if (!requiresReveal) return [3 /*break*/, 9];
                            haveManager = manager && typeof manager === 'object' ? !!manager.key : !!manager;
                            if (!!haveManager) return [3 /*break*/, 9];
                            _d = {
                                kind: 'reveal',
                                fee: exports.DEFAULT_FEE.REVEAL
                            };
                            return [4 /*yield*/, this.signer.publicKey()];
                        case 8:
                            reveal = (_d.public_key = _e.sent(),
                                _d.source = publicKeyHash,
                                _d.gas_limit = exports.DEFAULT_GAS_LIMIT.REVEAL,
                                _d.storage_limit = exports.DEFAULT_STORAGE_LIMIT.REVEAL,
                                _d);
                            ops.unshift(reveal);
                            _e.label = 9;
                        case 9:
                            counter = parseInt(headCounter || '0', 10);
                            if (!counters[publicKeyHash] || counters[publicKeyHash] < counter) {
                                counters[publicKeyHash] = counter;
                            }
                            return [4 /*yield*/, this.context.isAnyProtocolActive(protocols['005'])];
                        case 10:
                            proto005 = _e.sent();
                            constructOps = function (cOps) {
                                // tslint:disable strict-type-predicates
                                return cOps.map(function (op) {
                                    var constructedOp = __assign({}, op);
                                    if (_this.isSourceOp(op)) {
                                        if (typeof op.source === 'undefined') {
                                            constructedOp.source = publicKeyHash;
                                        }
                                    }
                                    if (_this.isFeeOp(op)) {
                                        if (typeof op.fee === 'undefined') {
                                            constructedOp.fee = '0';
                                        }
                                        else {
                                            constructedOp.fee = "" + op.fee;
                                        }
                                        if (typeof op.gas_limit === 'undefined') {
                                            constructedOp.gas_limit = '0';
                                        }
                                        else {
                                            constructedOp.gas_limit = "" + op.gas_limit;
                                        }
                                        if (typeof op.storage_limit === 'undefined') {
                                            constructedOp.storage_limit = '0';
                                        }
                                        else {
                                            constructedOp.storage_limit = "" + op.storage_limit;
                                        }
                                        var opCounter = ++counters[publicKeyHash];
                                        constructedOp.counter = "" + opCounter;
                                    }
                                    if (op.kind === 'origination') {
                                        if (typeof op.balance !== 'undefined')
                                            constructedOp.balance = "" + constructedOp.balance;
                                    }
                                    if (op.kind === 'transaction') {
                                        if (proto005 && constructedOp.source.toLowerCase().startsWith('kt1')) {
                                            throw new Error("KT1 addresses are not supported as source in " + exports.Protocols.PsBabyM1);
                                        }
                                        if (typeof op.amount !== 'undefined')
                                            constructedOp.amount = "" + constructedOp.amount;
                                    }
                                    // tslint:enable strict-type-predicates
                                    // Protocol 005 remove these from operations content
                                    if (proto005) {
                                        delete constructedOp.manager_pubkey;
                                        delete constructedOp.spendable;
                                        delete constructedOp.delegatable;
                                    }
                                    return constructedOp;
                                });
                            };
                            branch = head.hash;
                            contents = constructOps(ops);
                            protocol = metadata.next_protocol;
                            return [2 /*return*/, {
                                    opOb: {
                                        branch: branch,
                                        contents: contents,
                                        protocol: protocol,
                                    },
                                    counter: counter,
                                }];
                    }
                });
            });
        };
        OperationEmitter.prototype.prepareAndForge = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var prepared;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prepareOperation(params)];
                        case 1:
                            prepared = _a.sent();
                            return [2 /*return*/, this.forge(prepared)];
                    }
                });
            });
        };
        OperationEmitter.prototype.forge = function (_a) {
            var _b = _a.opOb, branch = _b.branch, contents = _b.contents, protocol = _b.protocol, counter = _a.counter;
            return __awaiter(this, void 0, void 0, function () {
                var forgedBytes;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.context.forger.forge({ branch: branch, contents: contents })];
                        case 1:
                            forgedBytes = _c.sent();
                            return [2 /*return*/, {
                                    opbytes: forgedBytes,
                                    opOb: {
                                        branch: branch,
                                        contents: contents,
                                        protocol: protocol,
                                    },
                                    counter: counter,
                                }];
                    }
                });
            });
        };
        OperationEmitter.prototype.simulate = function (op) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = {};
                            return [4 /*yield*/, this.rpc.runOperation(op)];
                        case 1: return [2 /*return*/, (_a.opResponse = _b.sent(),
                                _a.op = op,
                                _a.context = this.context.clone(),
                                _a)];
                    }
                });
            });
        };
        OperationEmitter.prototype.signAndInject = function (forgedBytes) {
            return __awaiter(this, void 0, void 0, function () {
                var signed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.signer.sign(forgedBytes.opbytes, new Uint8Array([3]))];
                        case 1:
                            signed = _a.sent();
                            return [2 /*return*/, this.inject(forgedBytes, signed.prefixSig, signed.sbytes)];
                    }
                });
            });
        };
        OperationEmitter.prototype.inject = function (forgedBytes, prefixSig, sbytes) {
            return __awaiter(this, void 0, void 0, function () {
                var opResponse, errors, results, i, j, content, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            forgedBytes.opbytes = sbytes;
                            forgedBytes.opOb.signature = prefixSig;
                            opResponse = [];
                            errors = [];
                            return [4 /*yield*/, this.rpc.preapplyOperations([forgedBytes.opOb])];
                        case 1:
                            results = _b.sent();
                            if (!Array.isArray(results)) {
                                throw new Error("RPC Fail: " + JSON.stringify(results));
                            }
                            for (i = 0; i < results.length; i++) {
                                for (j = 0; j < results[i].contents.length; j++) {
                                    opResponse.push(results[i].contents[j]);
                                    content = results[i].contents[j];
                                    if ('metadata' in content &&
                                        typeof content.metadata.operation_result !== 'undefined' &&
                                        content.metadata.operation_result.status === 'failed') {
                                        errors = errors.concat(content.metadata.operation_result.errors);
                                    }
                                }
                            }
                            if (errors.length) {
                                // @ts-ignore
                                throw new Error(JSON.stringify({ error: 'Operation Failed', errors: errors }));
                            }
                            _a = {};
                            return [4 /*yield*/, this.context.injector.inject(forgedBytes.opbytes)];
                        case 2: return [2 /*return*/, (_a.hash = _b.sent(),
                                _a.forgedBytes = forgedBytes,
                                _a.opResponse = opResponse,
                                _a.context = this.context.clone(),
                                _a)];
                    }
                });
            });
        };
        return OperationEmitter;
    }());

    /**
     * @description Utility class to interact with Tezos operations
     */
    var Operation = /** @class */ (function () {
        /**
         *
         * @param hash Operation hash
         * @param raw Raw operation that was injected
         * @param context Taquito context allowing access to rpc and signer
         */
        function Operation(hash, raw, results, context) {
            var _this = this;
            this.hash = hash;
            this.raw = raw;
            this.results = results;
            this.context = context;
            this._pollingConfig$ = new rxjs.ReplaySubject(1);
            this._currentHeadPromise = undefined;
            // Caching the current head for one second
            this.currentHead$ = rxjs.defer(function () {
                if (!_this._currentHeadPromise) {
                    _this._currentHeadPromise = _this.context.rpc.getBlock();
                    rxjs.timer(1000)
                        .pipe(operators.first())
                        .subscribe(function () {
                        _this._currentHeadPromise = undefined;
                    });
                }
                return rxjs.from(_this._currentHeadPromise);
            });
            // Polling observable that emit until timeout is reached
            this.polling$ = rxjs.defer(function () {
                return _this._pollingConfig$.pipe(operators.tap(function (_a) {
                    var timeout = _a.timeout, interval = _a.interval;
                    if (timeout <= 0) {
                        throw new Error('Timeout must be more than 0');
                    }
                    if (interval <= 0) {
                        throw new Error('Interval must be more than 0');
                    }
                }), operators.map(function (config) { return (__assign(__assign({}, config), { timeoutAt: Math.ceil(config.timeout / config.interval) + 1, count: 0 })); }), operators.switchMap(function (config) { return rxjs.timer(0, config.interval * 1000).pipe(operators.mapTo(config)); }), operators.tap(function (config) {
                    config.count++;
                    if (config.count > config.timeoutAt) {
                        throw new Error("Confirmation polling timed out");
                    }
                }));
            });
            // Observable that emit once operation is seen in a block
            this.confirmed$ = this.polling$.pipe(operators.switchMap(function () { return _this.currentHead$; }), operators.map(function (head) {
                for (var i = 3; i >= 0; i--) {
                    head.operations[i].forEach(function (op) {
                        if (op.hash === _this.hash) {
                            _this._foundAt = head.header.level;
                        }
                    });
                }
                if (head.header.level - _this._foundAt >= 0) {
                    return _this._foundAt;
                }
            }), operators.filter(function (x) { return x !== undefined; }), operators.first(), operators.shareReplay());
            this._foundAt = Number.POSITIVE_INFINITY;
            this.confirmed$.pipe(operators.first()).subscribe();
        }
        Object.defineProperty(Operation.prototype, "includedInBlock", {
            get: function () {
                return this._foundAt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "status", {
            get: function () {
                return (this.results.map(function (result) {
                    if (result.metadata && result.metadata.operation_result) {
                        return result.metadata.operation_result.status;
                    }
                    else {
                        return 'unknown';
                    }
                })[0] || 'unknown');
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         * @param confirmations [0] Number of confirmation to wait for
         * @param interval [10] Polling interval
         * @param timeout [180] Timeout
         */
        Operation.prototype.confirmation = function (confirmations, interval, timeout) {
            var _this = this;
            var _a = this.context.config, defaultConfirmationCount = _a.defaultConfirmationCount, confirmationPollingIntervalSecond = _a.confirmationPollingIntervalSecond, confirmationPollingTimeoutSecond = _a.confirmationPollingTimeoutSecond;
            this._pollingConfig$.next({
                interval: interval || confirmationPollingIntervalSecond,
                timeout: timeout || confirmationPollingTimeoutSecond,
            });
            var conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
            return new Promise(function (resolve, reject) {
                _this.confirmed$
                    .pipe(operators.switchMap(function () { return _this.polling$; }), operators.switchMap(function () { return _this.currentHead$; }), operators.filter(function (head) { return head.header.level - _this._foundAt >= conf; }), operators.first())
                    .subscribe(function (_) {
                    resolve(_this._foundAt + conf);
                }, reject);
            });
        };
        return Operation;
    }());

    /**
     * @description Origination operation provide utility function to fetch newly originated contract
     *
     * @warn Currently support only one origination per operation
     */
    var OriginationOperation = /** @class */ (function (_super) {
        __extends(OriginationOperation, _super);
        function OriginationOperation(hash, params, raw, results, context, contractProvider) {
            var _this = _super.call(this, hash, raw, results, context) || this;
            _this.params = params;
            _this.contractProvider = contractProvider;
            var originatedContracts = _this.operationResults && _this.operationResults.originated_contracts;
            if (Array.isArray(originatedContracts)) {
                _this.contractAddress = originatedContracts[0];
            }
            return _this;
        }
        Object.defineProperty(OriginationOperation.prototype, "operationResults", {
            get: function () {
                var originationOp = Array.isArray(this.results) &&
                    this.results.find(function (op) { return op.kind === 'origination'; });
                var result = originationOp && originationOp.metadata && originationOp.metadata.operation_result;
                return result ? result : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "fee", {
            get: function () {
                return this.params.fee;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "gasLimit", {
            get: function () {
                return this.params.gas_limit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "storageLimit", {
            get: function () {
                return this.params.storage_limit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "consumedGas", {
            get: function () {
                var consumedGas = this.operationResults && this.operationResults.consumed_gas;
                return consumedGas ? consumedGas : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "storageDiff", {
            get: function () {
                var storageDiff = this.operationResults && this.operationResults.paid_storage_size_diff;
                return storageDiff ? storageDiff : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "storageSize", {
            get: function () {
                var storageSize = this.operationResults && this.operationResults.storage_size;
                return storageSize ? storageSize : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "errors", {
            get: function () {
                return this.operationResults && this.operationResults.errors;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description Provide the contract abstract of the newly originated contract
         */
        OriginationOperation.prototype.contract = function (confirmations, interval, timeout) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.contractAddress) {
                                throw new Error('No contract was originated in this operation');
                            }
                            return [4 /*yield*/, this.confirmation(confirmations, interval, timeout)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.contractProvider.at(this.contractAddress)];
                    }
                });
            });
        };
        return OriginationOperation;
    }(Operation));

    var InvalidParameterError = /** @class */ (function () {
        function InvalidParameterError(smartContractMethodName, sigs, args) {
            this.smartContractMethodName = smartContractMethodName;
            this.sigs = sigs;
            this.args = args;
            this.name = 'Invalid parameters error';
            this.message = smartContractMethodName + " Received " + args.length + " arguments while expecting on of the follow signatures (" + JSON.stringify(sigs) + ")";
        }
        return InvalidParameterError;
    }());
    var InvalidDelegationSource = /** @class */ (function () {
        function InvalidDelegationSource(source) {
            this.source = source;
            this.name = 'Invalid delegation source error';
            this.message = "Since Babylon delegation source can no longer be a contract address " + source + ". Please use the smart contract abstraction to set your delegate.";
        }
        return InvalidDelegationSource;
    }());

    var DEFAULT_SMART_CONTRACT_METHOD_NAME = 'main';
    /**
     * @description Utility class to send smart contract operation
     */
    var ContractMethod = /** @class */ (function () {
        function ContractMethod(provider, address, parameterSchema, name, args, isMultipleEntrypoint, isAnonymous) {
            if (isMultipleEntrypoint === void 0) { isMultipleEntrypoint = true; }
            if (isAnonymous === void 0) { isAnonymous = false; }
            this.provider = provider;
            this.address = address;
            this.parameterSchema = parameterSchema;
            this.name = name;
            this.args = args;
            this.isMultipleEntrypoint = isMultipleEntrypoint;
            this.isAnonymous = isAnonymous;
        }
        Object.defineProperty(ContractMethod.prototype, "schema", {
            /**
             * @description Get the schema of the smart contract method
             */
            get: function () {
                return this.isAnonymous
                    ? this.parameterSchema.ExtractSchema()[this.name]
                    : this.parameterSchema.ExtractSchema();
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         * @description Send the smart contract operation
         *
         * @param Options generic operation parameter
         */
        ContractMethod.prototype.send = function (_a) {
            var _b, _c;
            var _d = _a === void 0 ? {} : _a, fee = _d.fee, gasLimit = _d.gasLimit, storageLimit = _d.storageLimit, _e = _d.amount, amount = _e === void 0 ? 0 : _e;
            return this.provider.transfer({
                to: this.address,
                amount: amount,
                fee: fee,
                gasLimit: gasLimit,
                storageLimit: storageLimit,
                parameter: {
                    entrypoint: this.isMultipleEntrypoint ? this.name : 'default',
                    value: this.isAnonymous
                        ? (_b = this.parameterSchema).Encode.apply(_b, __spreadArrays([this.name], this.args)) : (_c = this.parameterSchema).Encode.apply(_c, this.args),
                },
                rawParam: true,
            });
        };
        return ContractMethod;
    }());
    var validateArgs = function (args, schema, name) {
        var sigs = schema.ExtractSignatures();
        if (!sigs.find(function (x) { return x.length === args.length; })) {
            throw new InvalidParameterError(name, sigs, args);
        }
    };
    /**
     * @description Utility class to send smart contract operation
     */
    var LegacyContractMethod = /** @class */ (function () {
        function LegacyContractMethod(provider, address, parameterSchema, name, args) {
            this.provider = provider;
            this.address = address;
            this.parameterSchema = parameterSchema;
            this.name = name;
            this.args = args;
        }
        Object.defineProperty(LegacyContractMethod.prototype, "schema", {
            /**
             * @description Get the schema of the smart contract method
             */
            get: function () {
                return this.parameterSchema.isMultipleEntryPoint
                    ? this.parameterSchema.ExtractSchema()[this.name]
                    : this.parameterSchema.ExtractSchema();
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         * @description Send the smart contract operation
         *
         * @param Options generic operation parameter
         */
        LegacyContractMethod.prototype.send = function (_a) {
            var _b, _c;
            var _d = _a === void 0 ? {} : _a, fee = _d.fee, gasLimit = _d.gasLimit, storageLimit = _d.storageLimit, _e = _d.amount, amount = _e === void 0 ? 0 : _e;
            return this.provider.transfer({
                to: this.address,
                amount: amount,
                fee: fee,
                gasLimit: gasLimit,
                storageLimit: storageLimit,
                parameter: this.parameterSchema.isMultipleEntryPoint
                    ? (_b = this.parameterSchema).Encode.apply(_b, __spreadArrays([this.name], this.args)) : (_c = this.parameterSchema).Encode.apply(_c, this.args),
                rawParam: true,
            });
        };
        return LegacyContractMethod;
    }());
    /**
     * @description Smart contract abstraction
     */
    var Contract = /** @class */ (function () {
        function Contract(address, script, provider, entrypoints) {
            this.address = address;
            this.script = script;
            this.provider = provider;
            this.entrypoints = entrypoints;
            /**
             * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
             * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
             *
             */
            this.methods = {};
            this.schema = michelsonEncoder.Schema.fromRPCResponse({ script: this.script });
            this.parameterSchema = michelsonEncoder.ParameterSchema.fromRPCResponse({ script: this.script });
            if (!this.entrypoints) {
                this._initializeMethodsLegacy(address, provider);
            }
            else {
                this._initializeMethods(address, provider, this.entrypoints.entrypoints);
            }
        }
        Contract.prototype._initializeMethods = function (address, provider, entrypoints) {
            var _this = this;
            var parameterSchema = this.parameterSchema;
            var keys = Object.keys(entrypoints);
            if (parameterSchema.isMultipleEntryPoint) {
                keys.forEach(function (smartContractMethodName) {
                    var method = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var smartContractMethodSchema = new michelsonEncoder.ParameterSchema(entrypoints[smartContractMethodName]);
                        validateArgs(args, smartContractMethodSchema, smartContractMethodName);
                        return new ContractMethod(provider, address, smartContractMethodSchema, smartContractMethodName, args);
                    };
                    _this.methods[smartContractMethodName] = method;
                });
                // Deal with methods with no annotations which were not discovered by the RPC endpoint
                // Methods with no annotations are discovered using parameter schema
                var anonymousMethods = Object.keys(parameterSchema.ExtractSchema()).filter(function (key) { return Object.keys(entrypoints).indexOf(key) === -1; });
                anonymousMethods.forEach(function (smartContractMethodName) {
                    var method = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        validateArgs(__spreadArrays([smartContractMethodName], args), parameterSchema, smartContractMethodName);
                        return new ContractMethod(provider, address, parameterSchema, smartContractMethodName, args, false, true);
                    };
                    _this.methods[smartContractMethodName] = method;
                });
            }
            else {
                var smartContractMethodSchema_1 = this.parameterSchema;
                var method = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    validateArgs(args, parameterSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME);
                    return new ContractMethod(provider, address, smartContractMethodSchema_1, DEFAULT_SMART_CONTRACT_METHOD_NAME, args, false);
                };
                this.methods[DEFAULT_SMART_CONTRACT_METHOD_NAME] = method;
            }
        };
        Contract.prototype._initializeMethodsLegacy = function (address, provider) {
            var _this = this;
            var parameterSchema = this.parameterSchema;
            var paramSchema = this.parameterSchema.ExtractSchema();
            if (this.parameterSchema.isMultipleEntryPoint) {
                Object.keys(paramSchema).forEach(function (smartContractMethodName) {
                    var method = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        validateArgs(__spreadArrays([smartContractMethodName], args), parameterSchema, smartContractMethodName);
                        return new LegacyContractMethod(provider, address, parameterSchema, smartContractMethodName, args);
                    };
                    _this.methods[smartContractMethodName] = method;
                });
            }
            else {
                this.methods[DEFAULT_SMART_CONTRACT_METHOD_NAME] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    validateArgs(args, parameterSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME);
                    return new LegacyContractMethod(provider, address, parameterSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME, args);
                };
            }
        };
        /**
         * @description Return a friendly representation of the smart contract storage
         */
        Contract.prototype.storage = function () {
            return this.provider.getStorage(this.address, this.schema);
        };
        /**
         *
         * @description Return a friendly representation of the smart contract big map value
         *
         * @param key BigMap key to fetch
         */
        Contract.prototype.bigMap = function (key) {
            // tslint:disable-next-line: deprecation
            return this.provider.getBigMapKey(this.address, key, this.schema);
        };
        return Contract;
    }());

    var TZ_DECIMALS = 6;
    var MTZ_DECIMALS = 3;
    function getDecimal(format) {
        switch (format) {
            case 'tz':
                return TZ_DECIMALS;
            case 'mtz':
                return MTZ_DECIMALS;
            case 'mutez':
            default:
                return 0;
        }
    }
    function format(from, to, amount) {
        if (from === void 0) { from = 'mutez'; }
        if (to === void 0) { to = 'mutez'; }
        var bigNum = new BigNumber(amount);
        if (bigNum.isNaN()) {
            return amount;
        }
        return bigNum
            .multipliedBy(Math.pow(10, getDecimal(from)))
            .dividedBy(Math.pow(10, getDecimal(to)));
    }

    var createOriginationOperation = function (_a, publicKeyHash) {
        var code = _a.code, init = _a.init, _b = _a.balance, balance = _b === void 0 ? '0' : _b, _c = _a.spendable, spendable = _c === void 0 ? false : _c, _d = _a.delegatable, delegatable = _d === void 0 ? false : _d, delegate = _a.delegate, storage = _a.storage, _e = _a.fee, fee = _e === void 0 ? exports.DEFAULT_FEE.ORIGINATION : _e, _f = _a.gasLimit, gasLimit = _f === void 0 ? exports.DEFAULT_GAS_LIMIT.ORIGINATION : _f, _g = _a.storageLimit, storageLimit = _g === void 0 ? exports.DEFAULT_STORAGE_LIMIT.ORIGINATION : _g;
        return __awaiter(void 0, void 0, void 0, function () {
            var contractCode, contractStorage, schema, script, operation;
            return __generator(this, function (_h) {
                // tslint:disable-next-line: strict-type-predicates
                if (storage !== undefined && init !== undefined) {
                    throw new Error('Storage and Init cannot be set a the same time. Please either use storage or init but not both.');
                }
                contractCode = Array.isArray(code) ? code : utils.ml2mic(code);
                if (storage !== undefined) {
                    schema = new michelsonEncoder.Schema(contractCode[1].args[0]);
                    contractStorage = schema.Encode(storage);
                }
                else {
                    contractStorage = typeof init === 'string' ? utils.sexp2mic(init) : init;
                }
                script = {
                    code: Array.isArray(code) ? code : utils.ml2mic(code),
                    storage: contractStorage,
                };
                operation = {
                    kind: 'origination',
                    fee: fee,
                    gas_limit: gasLimit,
                    storage_limit: storageLimit,
                    balance: format('tz', 'mutez', balance).toString(),
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
    var createTransferOperation = function (_a) {
        var to = _a.to, amount = _a.amount, parameter = _a.parameter, _b = _a.fee, fee = _b === void 0 ? exports.DEFAULT_FEE.TRANSFER : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? exports.DEFAULT_GAS_LIMIT.TRANSFER : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? exports.DEFAULT_STORAGE_LIMIT.TRANSFER : _d, _e = _a.mutez, mutez = _e === void 0 ? false : _e, _f = _a.rawParam, rawParam = _f === void 0 ? false : _f;
        return __awaiter(void 0, void 0, void 0, function () {
            var operation;
            return __generator(this, function (_g) {
                operation = {
                    kind: 'transaction',
                    fee: fee,
                    gas_limit: gasLimit,
                    storage_limit: storageLimit,
                    amount: mutez ? amount.toString() : format('tz', 'mutez', amount).toString(),
                    destination: to,
                };
                if (parameter) {
                    operation.parameters = rawParam
                        ? parameter
                        : typeof parameter === 'string'
                            ? utils.sexp2mic(parameter)
                            : parameter;
                }
                return [2 /*return*/, operation];
            });
        });
    };
    var createSetDelegateOperation = function (_a) {
        var delegate = _a.delegate, source = _a.source, _b = _a.fee, fee = _b === void 0 ? exports.DEFAULT_FEE.DELEGATION : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? exports.DEFAULT_GAS_LIMIT.DELEGATION : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? exports.DEFAULT_STORAGE_LIMIT.DELEGATION : _d;
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
    var createRegisterDelegateOperation = function (_a, source) {
        var _b = _a.fee, fee = _b === void 0 ? exports.DEFAULT_FEE.DELEGATION : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? exports.DEFAULT_GAS_LIMIT.DELEGATION : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? exports.DEFAULT_STORAGE_LIMIT.DELEGATION : _d;
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

    var BigMapAbstraction = /** @class */ (function () {
        function BigMapAbstraction(id, schema, provider) {
            this.id = id;
            this.schema = schema;
            this.provider = provider;
        }
        BigMapAbstraction.prototype.get = function (keyToEncode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.provider.getBigMapKeyByID(this.id.toString(), keyToEncode, this.schema)];
                });
            });
        };
        BigMapAbstraction.prototype.toJSON = function () {
            return this.id.toString();
        };
        BigMapAbstraction.prototype.toString = function () {
            return this.id.toString();
        };
        return BigMapAbstraction;
    }());

    // Override the default michelson encoder semantic to provide richer abstraction over storage properties
    var smartContractAbstractionSemantic = function (provider) { return ({
        // Provide a specific abstraction for BigMaps
        big_map: function (val, code) {
            if (!val || !('int' in val) || val.int === undefined) {
                // Return an empty object in case of missing big map ID
                return {};
            }
            else {
                var schema = new michelsonEncoder.Schema(code);
                return new BigMapAbstraction(new BigNumber(val.int), schema, provider);
            }
        },
    }); };

    /**
     * @description Transaction operation provide utility function to fetch newly issued transaction
     *
     * @warn Currently support only one transaction per operation
     */
    var TransactionOperation = /** @class */ (function (_super) {
        __extends(TransactionOperation, _super);
        function TransactionOperation(hash, params, source, raw, results, context) {
            var _this = _super.call(this, hash, raw, results, context) || this;
            _this.params = params;
            _this.source = source;
            return _this;
        }
        Object.defineProperty(TransactionOperation.prototype, "operationResults", {
            get: function () {
                var transactionOp = Array.isArray(this.results) &&
                    this.results.find(function (op) { return op.kind === 'transaction'; });
                var result = transactionOp && transactionOp.metadata && transactionOp.metadata.operation_result;
                return result ? result : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "amount", {
            get: function () {
                return new BigNumber(this.params.amount);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "destination", {
            get: function () {
                return this.params.destination;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "fee", {
            get: function () {
                return this.params.fee;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "gasLimit", {
            get: function () {
                return this.params.gas_limit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "storageLimit", {
            get: function () {
                return this.params.storage_limit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "consumedGas", {
            get: function () {
                var consumedGas = this.operationResults && this.operationResults.consumed_gas;
                return consumedGas ? consumedGas : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "storageDiff", {
            get: function () {
                var storageDiff = this.operationResults && this.operationResults.paid_storage_size_diff;
                return storageDiff ? storageDiff : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "storageSize", {
            get: function () {
                var storageSize = this.operationResults && this.operationResults.storage_size;
                return storageSize ? storageSize : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "errors", {
            get: function () {
                return this.operationResults && this.operationResults.errors;
            },
            enumerable: true,
            configurable: true
        });
        return TransactionOperation;
    }(Operation));

    /**
     * @description Delegation operation provide utility function to fetch newly issued delegation
     *
     * @warn Currently support only one delegation per operation
     */
    var DelegateOperation = /** @class */ (function (_super) {
        __extends(DelegateOperation, _super);
        function DelegateOperation(hash, params, source, raw, results, context) {
            var _this = _super.call(this, hash, raw, results, context) || this;
            _this.params = params;
            _this.source = source;
            return _this;
        }
        Object.defineProperty(DelegateOperation.prototype, "operationResults", {
            get: function () {
                var delegationOp = Array.isArray(this.results) &&
                    this.results.find(function (op) { return op.kind === 'delegation'; });
                var result = delegationOp && delegationOp.metadata && delegationOp.metadata.operation_result;
                return result ? result : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "delegate", {
            get: function () {
                return this.delegate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "isRegisterOperation", {
            get: function () {
                return this.delegate === this.source;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "fee", {
            get: function () {
                return this.params.fee;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "gasLimit", {
            get: function () {
                return this.params.gas_limit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "storageLimit", {
            get: function () {
                return this.params.storage_limit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "consumedGas", {
            get: function () {
                var consumedGas = this.operationResults && this.operationResults.consumed_gas;
                return consumedGas ? consumedGas : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "errors", {
            get: function () {
                return this.operationResults && this.operationResults.errors;
            },
            enumerable: true,
            configurable: true
        });
        return DelegateOperation;
    }(Operation));

    var RpcContractProvider = /** @class */ (function (_super) {
        __extends(RpcContractProvider, _super);
        function RpcContractProvider(context, estimator) {
            var _this = _super.call(this, context) || this;
            _this.estimator = estimator;
            return _this;
        }
        /**
         *
         * @description Return a well formatted json object of the contract storage
         *
         * @param contract contract address you want to get the storage from
         * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
         *
         * @see http://tezos.gitlab.io/master/api/rpc.html#get-block-id-context-contracts-contract-id-script
         */
        RpcContractProvider.prototype.getStorage = function (contract, schema) {
            return __awaiter(this, void 0, void 0, function () {
                var contractSchema, storage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!schema) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.rpc.getScript(contract)];
                        case 1:
                            schema = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (schema instanceof michelsonEncoder.Schema) {
                                contractSchema = schema;
                            }
                            else {
                                contractSchema = michelsonEncoder.Schema.fromRPCResponse({ script: schema });
                            }
                            return [4 /*yield*/, this.rpc.getStorage(contract)];
                        case 3:
                            storage = _a.sent();
                            return [2 /*return*/, contractSchema.Execute(storage, smartContractAbstractionSemantic(this))]; // Cast into T because only the caller can know the true type of the storage
                    }
                });
            });
        };
        /**
         *
         * @description Return a well formatted json object of the contract big map storage
         *
         * @param contract contract address you want to get the storage from
         * @param key contract big map key to fetch value from
         * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
         *
         * @deprecated Deprecated in favor of getBigMapKeyByID
         *
         * @see http://tezos.gitlab.io/master/api/rpc.html#get-block-id-context-contracts-contract-id-script
         */
        RpcContractProvider.prototype.getBigMapKey = function (contract, key, schema) {
            return __awaiter(this, void 0, void 0, function () {
                var contractSchema, encodedKey, val;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!schema) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.rpc.getScript(contract)];
                        case 1:
                            schema = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (schema instanceof michelsonEncoder.Schema) {
                                contractSchema = schema;
                            }
                            else {
                                contractSchema = michelsonEncoder.Schema.fromRPCResponse({ script: schema });
                            }
                            encodedKey = contractSchema.EncodeBigMapKey(key);
                            return [4 /*yield*/, this.rpc.getBigMapKey(contract, encodedKey)];
                        case 3:
                            val = _a.sent();
                            return [2 /*return*/, contractSchema.ExecuteOnBigMapValue(val)]; // Cast into T because only the caller can know the true type of the storage
                    }
                });
            });
        };
        /**
         *
         * @description Return a well formatted json object of a big map value
         *
         * @param id Big Map ID
         * @param keyToEncode key to query (will be encoded properly according to the schema)
         * @param schema Big Map schema (can be determined using your contract type)
         *
         * @see http://tezos.gitlab.io/mainnet/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
         */
        RpcContractProvider.prototype.getBigMapKeyByID = function (id, keyToEncode, schema) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, key, type, packed, encodedExpr, bigMapValue;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = schema.EncodeBigMapKey(keyToEncode), key = _a.key, type = _a.type;
                            return [4 /*yield*/, this.context.rpc.packData({ data: key, type: type })];
                        case 1:
                            packed = (_b.sent()).packed;
                            encodedExpr = utils.encodeExpr(packed);
                            return [4 /*yield*/, this.context.rpc.getBigMapExpr(id.toString(), encodedExpr)];
                        case 2:
                            bigMapValue = _b.sent();
                            return [2 /*return*/, schema.ExecuteOnBigMapValue(bigMapValue, smartContractAbstractionSemantic(this))];
                    }
                });
            });
        };
        RpcContractProvider.prototype.estimate = function (_a, estimator) {
            var fee = _a.fee, gasLimit = _a.gasLimit, storageLimit = _a.storageLimit, rest = __rest(_a, ["fee", "gasLimit", "storageLimit"]);
            return __awaiter(this, void 0, void 0, function () {
                var calculatedFee, calculatedGas, calculatedStorage, estimation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            calculatedFee = fee;
                            calculatedGas = gasLimit;
                            calculatedStorage = storageLimit;
                            if (!(fee === undefined || gasLimit === undefined || storageLimit === undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, estimator(__assign({ fee: fee, gasLimit: gasLimit, storageLimit: storageLimit }, rest))];
                        case 1:
                            estimation = _b.sent();
                            if (calculatedFee === undefined) {
                                calculatedFee = estimation.suggestedFeeMutez;
                            }
                            if (calculatedGas === undefined) {
                                calculatedGas = estimation.gasLimit;
                            }
                            if (calculatedStorage === undefined) {
                                calculatedStorage = estimation.storageLimit;
                            }
                            _b.label = 2;
                        case 2: return [2 /*return*/, {
                                fee: calculatedFee,
                                gasLimit: calculatedGas,
                                storageLimit: calculatedStorage,
                            }];
                    }
                });
            });
        };
        /**
         *
         * @description Originate a new contract according to the script in parameters. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @warn You cannot specify storage and init at the same time (use init to pass the raw michelson representation of storage)
         *
         * @param OriginationOperation Originate operation parameter
         */
        RpcContractProvider.prototype.originate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, publicKeyHash, operation, preparedOrigination, forgedOrigination, _a, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.originate.bind(this.estimator))];
                        case 1:
                            estimate = _b.sent();
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 2:
                            publicKeyHash = _b.sent();
                            return [4 /*yield*/, createOriginationOperation(__assign(__assign({}, params), estimate), publicKeyHash)];
                        case 3:
                            operation = _b.sent();
                            return [4 /*yield*/, this.prepareOperation({ operation: operation, source: publicKeyHash })];
                        case 4:
                            preparedOrigination = _b.sent();
                            return [4 /*yield*/, this.forge(preparedOrigination)];
                        case 5:
                            forgedOrigination = _b.sent();
                            return [4 /*yield*/, this.signAndInject(forgedOrigination)];
                        case 6:
                            _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                            return [2 /*return*/, new OriginationOperation(hash, operation, forgedBytes, opResponse, context, this)];
                    }
                });
            });
        };
        /**
         *
         * @description Set the delegate for a contract. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param SetDelegate operation parameter
         */
        RpcContractProvider.prototype.setDelegate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, operation, sourceOrDefault, _a, opBytes, _b, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.context.isAnyProtocolActive(protocols['005'])];
                        case 1:
                            // Since babylon delegation source cannot smart contract
                            if ((_c.sent()) && /kt1/i.test(params.source)) {
                                throw new InvalidDelegationSource(params.source);
                            }
                            return [4 /*yield*/, this.estimate(params, this.estimator.setDelegate.bind(this.estimator))];
                        case 2:
                            estimate = _c.sent();
                            return [4 /*yield*/, createSetDelegateOperation(__assign(__assign({}, params), estimate))];
                        case 3:
                            operation = _c.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 4:
                            _a = (_c.sent());
                            _c.label = 5;
                        case 5:
                            sourceOrDefault = _a;
                            return [4 /*yield*/, this.prepareAndForge({
                                    operation: operation,
                                    source: sourceOrDefault,
                                })];
                        case 6:
                            opBytes = _c.sent();
                            return [4 /*yield*/, this.signAndInject(opBytes)];
                        case 7:
                            _b = _c.sent(), hash = _b.hash, context = _b.context, forgedBytes = _b.forgedBytes, opResponse = _b.opResponse;
                            return [2 /*return*/, new DelegateOperation(hash, operation, sourceOrDefault, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        /**
         *
         * @description Register the current address as delegate. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param RegisterDelegate operation parameter
         */
        RpcContractProvider.prototype.registerDelegate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, source, operation, opBytes, _a, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.registerDelegate.bind(this.estimator))];
                        case 1:
                            estimate = _b.sent();
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 2:
                            source = _b.sent();
                            return [4 /*yield*/, createRegisterDelegateOperation(__assign(__assign({}, params), estimate), source)];
                        case 3:
                            operation = _b.sent();
                            return [4 /*yield*/, this.prepareAndForge({ operation: operation })];
                        case 4:
                            opBytes = _b.sent();
                            return [4 /*yield*/, this.signAndInject(opBytes)];
                        case 5:
                            _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                            return [2 /*return*/, new DelegateOperation(hash, operation, source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        /**
         *
         * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param Transfer operation parameter
         */
        RpcContractProvider.prototype.transfer = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, operation, source, _a, opBytes, _b, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.transfer.bind(this.estimator))];
                        case 1:
                            estimate = _c.sent();
                            return [4 /*yield*/, createTransferOperation(__assign(__assign({}, params), estimate))];
                        case 2:
                            operation = _c.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 3:
                            _a = (_c.sent());
                            _c.label = 4;
                        case 4:
                            source = _a;
                            return [4 /*yield*/, this.prepareAndForge({ operation: operation, source: params.source })];
                        case 5:
                            opBytes = _c.sent();
                            return [4 /*yield*/, this.signAndInject(opBytes)];
                        case 6:
                            _b = _c.sent(), hash = _b.hash, context = _b.context, forgedBytes = _b.forgedBytes, opResponse = _b.opResponse;
                            return [2 /*return*/, new TransactionOperation(hash, operation, source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        /**
         *
         * @description Get relevant parameters for later signing and broadcast of a transfer transaction
         *
         * @returns GetTransferSignatureHashResponse parameters needed to sign and broadcast
         *
         * @param params operation parameters
         */
        RpcContractProvider.prototype.getTransferSignatureHash = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, operation, source, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.transfer.bind(this.estimator))];
                        case 1:
                            estimate = _b.sent();
                            return [4 /*yield*/, createTransferOperation(__assign(__assign({}, params), estimate))];
                        case 2:
                            operation = _b.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 3:
                            _a = (_b.sent());
                            _b.label = 4;
                        case 4:
                            source = _a;
                            return [2 /*return*/, this.prepareAndForge({ operation: operation, source: source })];
                    }
                });
            });
        };
        /**
         *
         * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param params result of `getTransferSignatureHash`
         * @param prefixSig the prefix to be used for the encoding of the signature bytes
         * @param sbytes signature bytes in hex
         */
        RpcContractProvider.prototype.signAndBroadcast = function (params, prefixSig, sbytes) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, hash, context, forgedBytes, opResponse, transactionParams, operation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.inject(params, prefixSig, sbytes)];
                        case 1:
                            _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                            if (!params.opOb.contents) {
                                throw new Error('Invalid operation contents');
                            }
                            transactionParams = params.opOb.contents.find(function (content) { return content.kind === 'transaction'; });
                            if (!transactionParams) {
                                throw new Error('No transaction in operation contents');
                            }
                            return [4 /*yield*/, createTransferOperation(constructedOperationToTransferParams(transactionParams))];
                        case 2:
                            operation = _b.sent();
                            return [2 /*return*/, new TransactionOperation(hash, operation, params.opOb.contents[0].source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        RpcContractProvider.prototype.at = function (address) {
            return __awaiter(this, void 0, void 0, function () {
                var script, entrypoints, script;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.context.isAnyProtocolActive(protocols['005'])];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.rpc.getScript(address)];
                        case 2:
                            script = _a.sent();
                            return [4 /*yield*/, this.rpc.getEntrypoints(address)];
                        case 3:
                            entrypoints = _a.sent();
                            return [2 /*return*/, new Contract(address, script, this, entrypoints)];
                        case 4: return [4 /*yield*/, this.rpc.getScript(address)];
                        case 5:
                            script = _a.sent();
                            return [2 /*return*/, new Contract(address, script, this)];
                    }
                });
            });
        };
        return RpcContractProvider;
    }(OperationEmitter));
    function constructedOperationToTransferParams(op) {
        return __assign({ to: op.destination, 
            // @ts-ignore
            amount: Number(op.amount), parameter: op.parameters, 
            // @ts-ignore
            fee: Number(op.fee), gasLimit: Number(op.gas_limit), storageLimit: Number(op.storage_limit) }, op);
    }

    var MINIMAL_FEE_MUTEZ = 100;
    var MINIMAL_FEE_PER_BYTE_MUTEZ = 1;
    var MINIMAL_FEE_PER_STORAGE_BYTE_MUTEZ = 1000;
    var MINIMAL_FEE_PER_GAS_MUTEZ = 0.1;
    var GAS_BUFFER = 100;
    var Estimate = /** @class */ (function () {
        function Estimate(_gasLimit, _storageLimit, opSize, 
        /**
         * @description Base fee in mutez (1 mutez = 1e10−6 tez)
         */
        baseFeeMutez) {
            if (baseFeeMutez === void 0) { baseFeeMutez = MINIMAL_FEE_MUTEZ; }
            this._gasLimit = _gasLimit;
            this._storageLimit = _storageLimit;
            this.opSize = opSize;
            this.baseFeeMutez = baseFeeMutez;
        }
        Object.defineProperty(Estimate.prototype, "burnFeeMutez", {
            /**
             * @description Burn fee in mutez
             */
            get: function () {
                return this.roundUp(Number(this.storageLimit) * MINIMAL_FEE_PER_STORAGE_BYTE_MUTEZ);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "storageLimit", {
            /**
             * @description Get the estimated storage limit
             */
            get: function () {
                var limit = Math.max(Number(this._storageLimit), 0);
                return limit > 0 ? limit : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "gasLimit", {
            /**
             * @description Suggested gasLimit for operation
             */
            get: function () {
                return Number(this._gasLimit) + GAS_BUFFER;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "operationFeeMutez", {
            get: function () {
                return (this.gasLimit * MINIMAL_FEE_PER_GAS_MUTEZ + Number(this.opSize) * MINIMAL_FEE_PER_BYTE_MUTEZ);
            },
            enumerable: true,
            configurable: true
        });
        Estimate.prototype.roundUp = function (nanotez) {
            return Math.ceil(Number(nanotez));
        };
        Object.defineProperty(Estimate.prototype, "minimalFeeMutez", {
            /**
             * @description Minimum fees for operation according to baker defaults
             */
            get: function () {
                return this.roundUp(MINIMAL_FEE_MUTEZ + this.operationFeeMutez);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "suggestedFeeMutez", {
            /**
             * @description Suggested fee for operation (minimal fees plus a small buffer)
             */
            get: function () {
                return this.roundUp(this.operationFeeMutez + MINIMAL_FEE_MUTEZ * 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "usingBaseFeeMutez", {
            /**
             * @description Fees according to your specified base fee will ensure that at least minimum fees are used
             */
            get: function () {
                return (Math.max(Number(this.baseFeeMutez), MINIMAL_FEE_MUTEZ) + this.roundUp(this.operationFeeMutez));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "totalCost", {
            get: function () {
                return this.minimalFeeMutez + this.burnFeeMutez;
            },
            enumerable: true,
            configurable: true
        });
        return Estimate;
    }());

    // RPC require a signature but do not verify it
    var SIGNATURE_STUB = 'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg';
    var RPCEstimateProvider = /** @class */ (function (_super) {
        __extends(RPCEstimateProvider, _super);
        function RPCEstimateProvider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Maximum values defined by the protocol
            _this.DEFAULT_PARAMS = {
                fee: 30000,
                storageLimit: 60000,
                gasLimit: 800000,
            };
            return _this;
        }
        RPCEstimateProvider.prototype.getOperationResult = function (opResponse, kind) {
            var results = opResponse.contents;
            var originationOp = Array.isArray(results) && results.find(function (op) { return op.kind === kind; });
            var opResult = originationOp && originationOp.metadata && originationOp.metadata.operation_result;
            var internalResult = originationOp && originationOp.metadata && originationOp.metadata.internal_operation_results;
            return __spreadArrays([opResult], (internalResult || []).map(function (_a) {
                var result = _a.result;
                return result;
            })).filter(function (x) { return !!x; });
        };
        RPCEstimateProvider.prototype.createEstimate = function (params, kind, defaultStorage, minimumGas) {
            if (minimumGas === void 0) { minimumGas = 0; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, opbytes, _b, branch, contents, operation, _c, opResponse, operationResults, totalGas, totalStorage;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.prepareAndForge(params)];
                        case 1:
                            _a = _d.sent(), opbytes = _a.opbytes, _b = _a.opOb, branch = _b.branch, contents = _b.contents;
                            operation = { branch: branch, contents: contents, signature: SIGNATURE_STUB };
                            return [4 /*yield*/, this.context.isAnyProtocolActive(protocols['005'])];
                        case 2:
                            if (!_d.sent()) return [3 /*break*/, 4];
                            _c = { operation: operation };
                            return [4 /*yield*/, this.rpc.getChainId()];
                        case 3:
                            operation = (_c.chain_id = _d.sent(), _c);
                            _d.label = 4;
                        case 4: return [4 /*yield*/, this.simulate(operation)];
                        case 5:
                            opResponse = (_d.sent()).opResponse;
                            operationResults = this.getOperationResult(opResponse, kind);
                            totalGas = 0;
                            totalStorage = 0;
                            operationResults.forEach(function (result) {
                                totalGas += Number(result.consumed_gas) || 0;
                                totalStorage +=
                                    'paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0;
                            });
                            return [2 /*return*/, new Estimate(Math.max(totalGas || 0, minimumGas), Number(totalStorage || 0) + defaultStorage, opbytes.length / 2)];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for an origination operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param OriginationOperation Originate operation parameter
         */
        RPCEstimateProvider.prototype.originate = function (_a) {
            var fee = _a.fee, storageLimit = _a.storageLimit, gasLimit = _a.gasLimit, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function () {
                var pkh, op;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1:
                            pkh = _b.sent();
                            return [4 /*yield*/, createOriginationOperation(__assign(__assign({}, rest), this.DEFAULT_PARAMS), pkh)];
                        case 2:
                            op = _b.sent();
                            return [2 /*return*/, this.createEstimate({ operation: op, source: pkh }, 'origination', exports.DEFAULT_STORAGE_LIMIT.ORIGINATION)];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for an transfer operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param TransferOperation Originate operation parameter
         */
        RPCEstimateProvider.prototype.transfer = function (_a) {
            var fee = _a.fee, storageLimit = _a.storageLimit, gasLimit = _a.gasLimit, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function () {
                var pkh, _b, op;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = rest.source;
                            if (_b) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1:
                            _b = (_c.sent());
                            _c.label = 2;
                        case 2:
                            pkh = _b;
                            return [4 /*yield*/, createTransferOperation(__assign(__assign({}, rest), this.DEFAULT_PARAMS))];
                        case 3:
                            op = _c.sent();
                            return [2 /*return*/, this.createEstimate({ operation: op, source: pkh }, 'transaction', exports.DEFAULT_STORAGE_LIMIT.TRANSFER)];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for a delegate operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param Estimate
         */
        RPCEstimateProvider.prototype.setDelegate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var op, sourceOrDefault, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, createSetDelegateOperation(__assign(__assign({}, params), this.DEFAULT_PARAMS))];
                        case 1:
                            op = _b.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 2:
                            _a = (_b.sent());
                            _b.label = 3;
                        case 3:
                            sourceOrDefault = _a;
                            return [2 /*return*/, this.createEstimate({ operation: op, source: sourceOrDefault }, 'delegation', exports.DEFAULT_STORAGE_LIMIT.DELEGATION, 
                                // Delegation have a minimum gas cost
                                exports.DEFAULT_GAS_LIMIT.DELEGATION)];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for a delegate operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param Estimate
         */
        RPCEstimateProvider.prototype.registerDelegate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var op, _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = createRegisterDelegateOperation;
                            _b = [__assign(__assign({}, params), this.DEFAULT_PARAMS)];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_e.sent()]))];
                        case 2:
                            op = _e.sent();
                            _c = this.createEstimate;
                            _d = { operation: op };
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 3: return [2 /*return*/, _c.apply(this, [(_d.source = _e.sent(), _d), 'delegation',
                                exports.DEFAULT_STORAGE_LIMIT.DELEGATION,
                                // Delegation have a minimum gas cost
                                exports.DEFAULT_GAS_LIMIT.DELEGATION])];
                    }
                });
            });
        };
        return RPCEstimateProvider;
    }(OperationEmitter));

    var IndexerProvider = /** @class */ (function () {
        function IndexerProvider(indexerClient) {
            this.indexerClient = indexerClient;
        }
        IndexerProvider.prototype.balanceHistory = function (address, _a) {
            var _b = _a === void 0 ? {} : _a, start = _b.start, end = _b.end, limit = _b.limit;
            return this.indexerClient.getBalanceHistory(address, { start: start, end: end, limit: limit });
        };
        return IndexerProvider;
    }());

    var opHashFilter = function (op, filter) { return op.hash === filter.opHash; };
    var sourceFilter = function (x, filter) {
        switch (x.kind) {
            case 'endorsement':
                return 'metadata' in x && x.metadata.delegate === filter.source;
            case 'activate_account':
                return 'metadata' in x && x.pkh === filter.source;
            default:
                return 'source' in x && x.source === filter.source;
        }
    };
    var kindFilter = function (x, filter) { return 'kind' in x && x.kind === filter.kind; };
    var destinationFilter = function (x, filter) {
        switch (x.kind) {
            case 'delegation':
                return x.delegate === filter.destination;
            case 'origination':
                if ('metadata' in x &&
                    'operation_result' in x.metadata &&
                    'originated_contracts' in x.metadata.operation_result &&
                    Array.isArray(x.metadata.operation_result.originated_contracts)) {
                    return x.metadata.operation_result.originated_contracts.some(function (contract) { return contract === filter.destination; });
                }
                break;
            case 'transaction':
                return x.destination === filter.destination;
            default:
                return false;
        }
    };
    var evaluateOpFilter = function (op, filter) {
        if ('opHash' in filter) {
            return opHashFilter(op, filter);
        }
        else if ('source' in filter) {
            return sourceFilter(op, filter);
        }
        else if ('kind' in filter) {
            return kindFilter(op, filter);
        }
        else if ('destination' in filter) {
            return destinationFilter(op, filter);
        }
        return false;
    };
    var evaluateExpression = function (op, exp) {
        if (Array.isArray(exp.and)) {
            return exp.and.every(function (x) { return evaluateFilter(op, x); });
        }
        else if (Array.isArray(exp.or)) {
            return exp.or.some(function (x) { return evaluateFilter(op, x); });
        }
        else {
            throw new Error('Filter expression must contains either and/or property');
        }
    };
    var evaluateFilter = function (op, filter) {
        var filters = [];
        if (!Array.isArray(filter)) {
            filters.push(filter);
        }
        else {
            filters.push.apply(filters, filter);
        }
        return filters.every(function (filterOrExp) {
            if ('and' in filterOrExp || 'or' in filterOrExp) {
                return evaluateExpression(op, filterOrExp);
            }
            else {
                return evaluateOpFilter(op, filterOrExp);
            }
        });
    };

    var ObservableSubscription = /** @class */ (function () {
        function ObservableSubscription(obs) {
            var _this = this;
            this.errorListeners = [];
            this.messageListeners = [];
            this.closeListeners = [];
            this.completed$ = new rxjs.Subject();
            obs.pipe(operators.takeUntil(this.completed$)).subscribe(function (data) {
                _this.call(_this.messageListeners, data);
            }, function (error) {
                _this.call(_this.errorListeners, error);
            }, function () {
                _this.call(_this.closeListeners);
            });
        }
        ObservableSubscription.prototype.call = function (listeners, value) {
            for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                var l = listeners_1[_i];
                try {
                    l(value);
                }
                catch (ex) {
                    console.error(ex);
                }
            }
        };
        ObservableSubscription.prototype.remove = function (listeners, value) {
            var idx = listeners.indexOf(value);
            if (idx !== -1) {
                listeners.splice(idx, 1);
            }
        };
        ObservableSubscription.prototype.on = function (type, cb) {
            switch (type) {
                case 'data':
                    this.messageListeners.push(cb);
                    break;
                case 'error':
                    this.errorListeners.push(cb);
                    break;
                case 'close':
                    this.closeListeners.push(cb);
                    break;
                default:
                    throw new Error("Trying to register on an unsupported event: " + type);
            }
        };
        ObservableSubscription.prototype.off = function (type, cb) {
            switch (type) {
                case 'data':
                    this.remove(this.messageListeners, cb);
                    break;
                case 'error':
                    this.remove(this.errorListeners, cb);
                    break;
                case 'close':
                    this.remove(this.closeListeners, cb);
                    break;
                default:
                    throw new Error("Trying to unregister on an unsupported event: " + type);
            }
        };
        ObservableSubscription.prototype.close = function () {
            this.completed$.next();
        };
        return ObservableSubscription;
    }());

    var getLastBlock = function (context) {
        return rxjs.from(context.rpc.getBlock()).pipe(operators.first());
    };
    var applyFilter = function (filter) {
        return operators.concatMap(function (block) {
            return new rxjs.Observable(function (sub) {
                for (var _i = 0, _a = block.operations; _i < _a.length; _i++) {
                    var ops = _a[_i];
                    for (var _b = 0, ops_1 = ops; _b < ops_1.length; _b++) {
                        var op = ops_1[_b];
                        for (var _c = 0, _d = op.contents; _c < _d.length; _c++) {
                            var content = _d[_c];
                            if (evaluateFilter(__assign({ hash: op.hash }, content), filter)) {
                                sub.next(__assign({ hash: op.hash }, content));
                            }
                        }
                    }
                }
                sub.complete();
            });
        });
    };
    var PollingSubscribeProvider = /** @class */ (function () {
        function PollingSubscribeProvider(context, POLL_INTERVAL) {
            var _this = this;
            if (POLL_INTERVAL === void 0) { POLL_INTERVAL = 20000; }
            this.context = context;
            this.POLL_INTERVAL = POLL_INTERVAL;
            this.newBlock$ = rxjs.timer(0, this.POLL_INTERVAL).pipe(operators.map(function () { return _this.context; }), operators.switchMap(getLastBlock), operators.distinctUntilKeyChanged('hash'), operators.publishReplay(), operators.refCount());
        }
        PollingSubscribeProvider.prototype.subscribe = function (_filter) {
            return new ObservableSubscription(this.newBlock$.pipe(operators.pluck('hash')));
        };
        PollingSubscribeProvider.prototype.subscribeOperation = function (filter) {
            return new ObservableSubscription(this.newBlock$.pipe(applyFilter(filter)));
        };
        return PollingSubscribeProvider;
    }());

    var RpcTzProvider = /** @class */ (function (_super) {
        __extends(RpcTzProvider, _super);
        function RpcTzProvider(context) {
            return _super.call(this, context) || this;
        }
        RpcTzProvider.prototype.getBalance = function (address) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.rpc.getBalance(address)];
                });
            });
        };
        RpcTzProvider.prototype.getDelegate = function (address) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.rpc.getDelegate(address)];
                });
            });
        };
        RpcTzProvider.prototype.activate = function (pkh, secret) {
            return __awaiter(this, void 0, void 0, function () {
                var operation, forgedBytes, bytes, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            operation = {
                                kind: 'activate_account',
                                pkh: pkh,
                                secret: secret,
                            };
                            return [4 /*yield*/, this.prepareAndForge({ operation: [operation], source: pkh })];
                        case 1:
                            forgedBytes = _b.sent();
                            bytes = forgedBytes.opbytes + "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
                            _a = Operation.bind;
                            return [4 /*yield*/, this.rpc.injectOperation(bytes)];
                        case 2: return [2 /*return*/, new (_a.apply(Operation, [void 0, _b.sent(), __assign(__assign({}, forgedBytes), { opbytes: bytes }), [],
                                this.context.clone()]))()];
                    }
                });
            });
        };
        return RpcTzProvider;
    }(OperationEmitter));

    var setDelegate = function (key) {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            {
                prim: 'PUSH',
                args: [{ prim: 'key_hash' }, { string: key }],
            },
            { prim: 'SOME' },
            { prim: 'SET_DELEGATE' },
            { prim: 'CONS' },
        ];
    };
    var transferImplicit = function (key, mutez) {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            {
                prim: 'PUSH',
                args: [{ prim: 'key_hash' }, { string: key }],
            },
            { prim: 'IMPLICIT_ACCOUNT' },
            {
                prim: 'PUSH',
                args: [{ prim: 'mutez' }, { int: "" + mutez }],
            },
            { prim: 'UNIT' },
            { prim: 'TRANSFER_TOKENS' },
            { prim: 'CONS' },
        ];
    };
    var removeDelegate = function () {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            { prim: 'NONE', args: [{ prim: 'key_hash' }] },
            { prim: 'SET_DELEGATE' },
            { prim: 'CONS' },
        ];
    };
    var transferToContract = function (key, amount) {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            {
                prim: 'PUSH',
                args: [{ prim: 'address' }, { string: key }],
            },
            { prim: 'CONTRACT', args: [{ prim: 'unit' }] },
            [
                {
                    prim: 'IF_NONE',
                    args: [[[{ prim: 'UNIT' }, { prim: 'FAILWITH' }]], []],
                },
            ],
            {
                prim: 'PUSH',
                args: [{ prim: 'mutez' }, { int: "" + amount }],
            },
            { prim: 'UNIT' },
            { prim: 'TRANSFER_TOKENS' },
            { prim: 'CONS' },
        ];
    };
    var MANAGER_LAMBDA = {
        setDelegate: setDelegate,
        removeDelegate: removeDelegate,
        transferImplicit: transferImplicit,
        transferToContract: transferToContract,
    };

    /**
     * @description Facade class that surfaces all of the libraries capability and allow it's configuration
     */
    var TezosToolkit = /** @class */ (function () {
        function TezosToolkit() {
            this._rpcClient = new rpc.RpcClient();
            this._indexerClient = new indexer.IndexerClient();
            this._options = {};
            this._context = new Context();
            this._tz = new RpcTzProvider(this._context);
            this._estimate = new RPCEstimateProvider(this._context);
            this._contract = new RpcContractProvider(this._context, this._estimate);
            this.format = format;
            this.setProvider({ rpc: this._rpcClient });
        }
        /**
         *
         * @param options rpc url or rpcClient to use to interact with the Tezos network and indexer url to use to interact with the Tezos network
         */
        TezosToolkit.prototype.setProvider = function (_a) {
            var rpc = _a.rpc, indexer = _a.indexer, stream = _a.stream, signer = _a.signer, protocol = _a.protocol, config = _a.config;
            this.setRpcProvider(rpc);
            this.setIndexerProvider(indexer);
            this.setStreamProvider(stream);
            this.setSignerProvider(signer);
            this._context.proto = protocol;
            this._context.config = config;
        };
        TezosToolkit.prototype.setSignerProvider = function (signer) {
            if (!this._options.signer && typeof signer === 'undefined') {
                this._context.signer = new NoopSigner();
                this._options.signer = signer;
            }
            else if (typeof signer !== 'undefined') {
                this._context.signer = signer;
                this._options.signer = signer;
            }
        };
        TezosToolkit.prototype.setRpcProvider = function (rpc$1) {
            if (typeof rpc$1 === 'string') {
                this._rpcClient = new rpc.RpcClient(rpc$1);
            }
            else if (rpc$1 instanceof rpc.RpcClient) {
                this._rpcClient = rpc$1;
            }
            else if (this._options.rpc === undefined) {
                this._rpcClient = new rpc.RpcClient();
            }
            this._options.rpc = rpc$1;
            this._context.rpc = this._rpcClient;
        };
        TezosToolkit.prototype.setIndexerProvider = function (indexer$1) {
            if (typeof indexer$1 === 'string') {
                this._indexerClient = new indexer.IndexerClient(indexer$1);
            }
            else if (indexer$1 instanceof indexer.IndexerClient) {
                this._indexerClient = indexer$1;
            }
            else if (this._options.indexer === undefined) {
                this._indexerClient = new indexer.IndexerClient();
            }
            this._query = new IndexerProvider(this._indexerClient);
            this._options.indexer = indexer$1;
        };
        TezosToolkit.prototype.setStreamProvider = function (stream) {
            if (typeof stream === 'string') {
                this._stream = new PollingSubscribeProvider(new Context(new rpc.RpcClient(stream)));
            }
            else if (typeof stream !== 'undefined') {
                this._stream = stream;
            }
            else if (this._options.stream === undefined) {
                this._stream = new PollingSubscribeProvider(this._context);
            }
            this._options.stream = stream;
        };
        Object.defineProperty(TezosToolkit.prototype, "tz", {
            /**
             * @description Provide access to tezos account management
             */
            get: function () {
                return this._tz;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "contract", {
            /**
             * @description Provide access to smart contract utilities
             */
            get: function () {
                return this._contract;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "estimate", {
            /**
             * @description Provide access to operation estimation utilities
             */
            get: function () {
                return this._estimate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "query", {
            /**
             * @description Provide access to querying utilities backed by an indexer implementation
             */
            get: function () {
                return this._query;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "stream", {
            /**
             * @description Provide access to streaming utilities backed by an streamer implementation
             */
            get: function () {
                return this._stream;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "rpc", {
            /**
             * @description Provide access to the currently used rpc client
             */
            get: function () {
                return this._context.rpc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "signer", {
            /**
             * @description Provide access to the currently used signer
             */
            get: function () {
                return this._context.signer;
            },
            enumerable: true,
            configurable: true
        });
        TezosToolkit.prototype.importKey = function (privateKeyOrEmail, passphrase, mnemonic, secret) {
            return __awaiter(this, void 0, void 0, function () {
                var signer$1, pkh, op, ex_1, isInvalidActivationError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(privateKeyOrEmail && passphrase && mnemonic && secret)) return [3 /*break*/, 8];
                            signer$1 = signer.InMemorySigner.fromFundraiser(privateKeyOrEmail, passphrase, mnemonic);
                            return [4 /*yield*/, signer$1.publicKeyHash()];
                        case 1:
                            pkh = _a.sent();
                            op = void 0;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.tz.activate(pkh, secret)];
                        case 3:
                            op = _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            ex_1 = _a.sent();
                            isInvalidActivationError = ex_1 && ex_1.body && /Invalid activation/.test(ex_1.body);
                            if (!isInvalidActivationError) {
                                throw ex_1;
                            }
                            return [3 /*break*/, 5];
                        case 5:
                            if (!op) return [3 /*break*/, 7];
                            return [4 /*yield*/, op.confirmation()];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            this.setSignerProvider(signer$1);
                            return [3 /*break*/, 9];
                        case 8:
                            // Fallback to regular import
                            this.setSignerProvider(new signer.InMemorySigner(privateKeyOrEmail, passphrase));
                            _a.label = 9;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        return TezosToolkit;
    }());
    /**
     * @description Default Tezos toolkit instance
     */
    var Tezos = new TezosToolkit();

    exports.BigMapAbstraction = BigMapAbstraction;
    exports.InvalidDelegationSource = InvalidDelegationSource;
    exports.InvalidParameterError = InvalidParameterError;
    exports.MANAGER_LAMBDA = MANAGER_LAMBDA;
    exports.Tezos = Tezos;
    exports.TezosToolkit = TezosToolkit;
    exports.protocols = protocols;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taquito.umd.js.map
