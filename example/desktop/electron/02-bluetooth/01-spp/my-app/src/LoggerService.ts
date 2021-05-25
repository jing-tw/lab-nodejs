import {createLogger, format, transports} from 'winston'

export default class LoggerService {
  public static logger = createLogger({
    level: 'info',
    //format: winston.format.json(),
    format: format.combine(
        format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // format.label({ label: '[my-label]' }),
        //
        // The simple format outputs
        // `${level}: ${message} ${[Object with everything else]}`
        // format.simple()
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        // clean the log file when start
        new transports.File({ filename: 'error.log', level: 'error', options:{flag: 'w'} }),
        new transports.File({ filename: 'combined.log', options:{flag: 'w'} })
        ],
    });

    public static init(){
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new transports.Console({
            format: format.simple(),
            }));
        }
    }
}
