declare const ProviderWrapper: (provider: any) => {
    send: (...args: any[]) => any;
    on: (...args: any[]) => any;
    enable: (...args: any[]) => any;
    disable: (...args: any[]) => any;
};
export default ProviderWrapper;
