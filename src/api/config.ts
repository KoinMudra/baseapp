import { ORDER_BOOK_DEFAULT_SIDE_LIMIT, STORAGE_DEFAULT_LIMIT } from '../constants';
import { Config } from './types';

export const defaultConfig: Config = {
    api: {
        authUrl: '',
        tradeUrl: '',
        applogicUrl: '',
        rangerUrl: '',
        arkeUrl: '',
        finexUrl: '',
    },
    minutesUntilAutoLogout: '5',
    rangerReconnectPeriod: '1',
    withCredentials: true,
    storage: {},
    gaTrackerKey: '',
    msAlertDisplayTime: '5000',
    incrementalOrderBook: false,
    finex: false,
    isResizable: false,
    isDraggable: false,
    languages: ['en'],
    sessionCheckInterval: '15000',
    balancesFetchInterval: '3000',
    passwordEntropyStep: 0,
};

export const KoinMudra = {
    config: defaultConfig,
};

declare global {
    interface Window {
        env: Config;
    }
}

window.env = window.env || defaultConfig;
KoinMudra.config = { ...window.env };
KoinMudra.config.storage = KoinMudra.config.storage || {};

export const tradeUrl = () => KoinMudra.config.api.tradeUrl;
export const arkeUrl = () => KoinMudra.config.api.arkeUrl || tradeUrl();
export const authUrl = () => KoinMudra.config.api.authUrl;
export const applogicUrl = () => KoinMudra.config.api.applogicUrl;
export const rangerUrl = () => KoinMudra.config.api.rangerUrl;
export const finexUrl = () => KoinMudra.config.api.finexUrl || tradeUrl();
export const minutesUntilAutoLogout = (): string => KoinMudra.config.minutesUntilAutoLogout || '5';
export const withCredentials = () => KoinMudra.config.withCredentials;
export const defaultStorageLimit = () => KoinMudra.config.storage.defaultStorageLimit || STORAGE_DEFAULT_LIMIT;
export const orderBookSideLimit = () => KoinMudra.config.storage.orderBookSideLimit || ORDER_BOOK_DEFAULT_SIDE_LIMIT;
export const gaTrackerKey = (): string => KoinMudra.config.gaTrackerKey || '';
export const msAlertDisplayTime = (): string => KoinMudra.config.msAlertDisplayTime || '5000';
export const rangerReconnectPeriod = (): number => KoinMudra.config.rangerReconnectPeriod ? Number(KoinMudra.config.rangerReconnectPeriod) : 1;
export const incrementalOrderBook = (): boolean => KoinMudra.config.incrementalOrderBook || false;
export const isResizableGrid = ():boolean => KoinMudra.config.isResizable || false;
export const isDraggableGrid = ():boolean => KoinMudra.config.isDraggable || false;
export const languages = KoinMudra.config.languages && KoinMudra.config.languages.length > 0 ? KoinMudra.config.languages : ['en'];
export const sessionCheckInterval = (): string => KoinMudra.config.sessionCheckInterval || '15000';
export const balancesFetchInterval = (): string => KoinMudra.config.balancesFetchInterval || '3000';
export const isFinexEnabled = (): boolean => KoinMudra.config.finex || false;
export const passwordEntropyStep = ():number => KoinMudra.config.passwordEntropyStep;
