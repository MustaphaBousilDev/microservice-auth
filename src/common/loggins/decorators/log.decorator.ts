import { LogLevel } from '../enums/log-level.enum';
import { LoggerService } from '../logger.service';

export function Log(level: LogLevel = LogLevel.INFO) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const logger = new LoggerService();
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
