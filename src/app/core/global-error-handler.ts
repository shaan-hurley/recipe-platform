// src/app/core/global-error-handler.ts
import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private loggingService: LoggingService) { }

    handleError(error: any): void {
        this.loggingService.logError(error.message);
        console.error('Global error:', error);
    }
}
