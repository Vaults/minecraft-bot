export type ErrorHandler = (error) => void;
export interface BotModule {
    start: () => void;
    stop: () => void;
    init: (args: string, callback: () => void) => void;
    getIdentifier: () => string;
    setErrorHandler: (ErrorHandler) => void;
    getArgsDescription: () => string;
}