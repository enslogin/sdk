"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderWrapper = function (provider) { return ({
    send: provider.send ? function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return provider.send.apply(provider, args);
    } : null,
    on: provider.on ? function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        provider.on.apply(provider, args);
        return ProviderWrapper(provider);
    } : null,
    enable: provider.enable ? function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return provider.enable.apply(provider, args);
    } : null,
    disable: provider.disable ? function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return provider.disable.apply(provider, args);
    } : null,
}); };
exports.default = ProviderWrapper;
