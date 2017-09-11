/**
 * Logging services
 */
export class LoggerService {
    /**
     * Logs some information
     * @param {any} msg Data to log
     */
    log(msg: any): void {
        console.log(msg);
    }

    /**
     * Logs an error
     * @param {any} msg Error to log
     */
    error(msg: any): void {
        console.error(msg);
    }

    /**
     * Logs a warning
     * @param {any} msg Warning to log
     */
    warn(msg: any): void {
        console.warn(msg);
    }
}
