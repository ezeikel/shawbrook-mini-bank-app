/// <reference types="react" />
/// <reference types="react-native" />

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

// Global JavaScript built-ins
declare let Date: DateConstructor;
declare let Object: ObjectConstructor;
declare let Array: ArrayConstructor;
declare let parseFloat: (string: string) => number;
declare let Intl: typeof Intl;
declare let String: StringConstructor;
declare let Number: NumberConstructor; 