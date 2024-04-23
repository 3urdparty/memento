"use strict";
// src/schemas/menu.schema.ts
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardSchema = exports.Flashcard = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Flashcard = function () {
    var _classDecorators = [(0, mongoose_1.Schema)({
            timestamps: { createdAt: 'created', updatedAt: 'updated' },
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _question_decorators;
    var _question_initializers = [];
    var _question_extraInitializers = [];
    var _answer_decorators;
    var _answer_initializers = [];
    var _answer_extraInitializers = [];
    var Flashcard = _classThis = /** @class */ (function () {
        function Flashcard_1() {
            this.question = __runInitializers(this, _question_initializers, void 0);
            this.answer = (__runInitializers(this, _question_extraInitializers), __runInitializers(this, _answer_initializers, void 0));
            // @Prop({ required: true })
            this.tags = __runInitializers(this, _answer_extraInitializers);
        }
        return Flashcard_1;
    }());
    __setFunctionName(_classThis, "Flashcard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _question_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _answer_decorators = [(0, mongoose_1.Prop)({ required: true })];
        __esDecorate(null, null, _question_decorators, { kind: "field", name: "question", static: false, private: false, access: { has: function (obj) { return "question" in obj; }, get: function (obj) { return obj.question; }, set: function (obj, value) { obj.question = value; } }, metadata: _metadata }, _question_initializers, _question_extraInitializers);
        __esDecorate(null, null, _answer_decorators, { kind: "field", name: "answer", static: false, private: false, access: { has: function (obj) { return "answer" in obj; }, get: function (obj) { return obj.answer; }, set: function (obj, value) { obj.answer = value; } }, metadata: _metadata }, _answer_initializers, _answer_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Flashcard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Flashcard = _classThis;
}();
exports.Flashcard = Flashcard;
exports.FlashcardSchema = mongoose_1.SchemaFactory.createForClass(Flashcard);
