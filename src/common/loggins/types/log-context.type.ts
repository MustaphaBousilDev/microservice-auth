export interface LogContext {
  requestId?: string;
  userId?: string;
  timestamp?: Date;
  serviceName?: string;
  environment?: string;
  [key: string]: any;
}
