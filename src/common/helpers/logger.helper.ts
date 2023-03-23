import { Logger, LoggerService as NestLoggerService } from '@nestjs/common';

export class LoggerService implements NestLoggerService {
    private readonly logger = new Logger();


    log(message: string) {
        this.logger.log(message);
    }

    error(message: string, trace: string) {
        this.logger.error(message, trace);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }

    //   log(message: any, ...optionalParams: any[]) {
    //     this.logger.log(message);
    // }
    // error(message: any, ...optionalParams: any[]) {
    //     throw new Error('Method not implemented.');
    // }
    // warn(message: any, ...optionalParams: any[]) {
    //     throw new Error('Method not implemented.');
    // }
    // debug?(message: any, ...optionalParams: any[]) {
    //     throw new Error('Method not implemented.');
    // }


}