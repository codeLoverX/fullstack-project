import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, prettyPrint, colorize } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
}

export const winstonLogger = createLogger({
    levels,
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
})


if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new transports.Console({
        format: colorize({ all: true }),
    }));
}

