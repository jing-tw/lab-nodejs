import winston = require('winston');
import {format} from 'winston';

import BrowserConsole from 'winston-transport-browserconsole';

export default class LoggerService {
    public static logger:winston.Logger;
    public static init(strLevel:string='info', bRunInBrowser=false){
        let config = {
                level: 'info',
                format: format.combine(
                    format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
                ),
        }
        LoggerService.logger = winston.createLogger(config);

        if (process.env.NODE_ENV !== 'production') {
            if (bRunInBrowser){
                // in browser
                const transportsBrowserConsole = new BrowserConsole(
                    { level: strLevel,
                      format: winston.format.simple(),
                    },
                )
                LoggerService.logger.add(transportsBrowserConsole);
                return;
            }

            // in node
            const transportsConsole = new winston.transports.Console(
                {level: strLevel,
                    format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                    )}
            );
    
            const transportsErrorFile = new winston.transports.File(
                {filename: 'error.log', level: 'error', options:{flag: 'w'}},
            );
    
            const transportsCombinedFile = new winston.transports.File(
                {filename: 'combined.log', level: strLevel, options:{flag: 'w'}},
            );

            LoggerService.logger.add(transportsConsole);
            LoggerService.logger.add(transportsErrorFile);
            LoggerService.logger.add(transportsCombinedFile);
        }
    }
}
