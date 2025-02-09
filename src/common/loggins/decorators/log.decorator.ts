import { LogLevel } from '../enums/log-level.enum';
import { LoggerService } from '../logger.service';

// Create a storage for logger instance
export const LoggerStorage = {
  loggerService: null as LoggerService | null,
};
// Method to set logger instance
export const setLoggerService = (logger: LoggerService) => {
  LoggerStorage.loggerService = logger;
};

export function Log(level: LogLevel = LogLevel.INFO) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      if (!LoggerStorage.loggerService) {
        throw new Error('Logger service not initialized');
      }
      const logger = LoggerStorage.loggerService;
      const className = target.constructor.name;
      const methodName = propertyKey;
      try {
        logger.info(`${className}.${methodName} Started`, {
          args,
          timestamp: new Date(),
        });

        const result = await originalMethod.apply(this, args);

        logger.info(`${className}.${methodName} Completed`, {
          result,
          timestamp: new Date(),
        });

        return result;
      } catch (error) {
        logger.error(`${className}.${methodName} Failed`, {
          error: error.message,
          stack: error.stack,
          timestamp: new Date(),
        });
        throw error;
      }
    };

    return descriptor;
  };
}
