"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Wrapper = function (provider) { return ({
    enable: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return provider.enable.apply(provider, args);
    },
    disable: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return provider.disable.apply(provider, args);
    },
    send: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return provider.send.apply(provider, args);
    },
    on: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        provider.on.apply(provider, args);
        return wrapper(provider);
    },
}); };
