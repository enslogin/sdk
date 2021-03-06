"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProviderWrapper = (provider) => ({
    send: provider.send ? (...args) => provider.send(...args) : null,
    on: provider.on ? (...args) => { provider.on(...args); return ProviderWrapper(provider); } : null,
    enable: provider.enable ? (...args) => provider.enable(...args) : null,
    disable: provider.disable ? (...args) => provider.disable(...args) : null,
});
exports.default = ProviderWrapper;
