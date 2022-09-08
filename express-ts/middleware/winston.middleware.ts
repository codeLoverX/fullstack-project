import {Request, Response, NextFunction} from 'express'
import { winstonLogger } from '../winston/logger'

function customWinstonLogger(request: Request, _: Response,  next: NextFunction) {
  winstonLogger.log('info', `${request.method} ${request.path}`)

  next()
}

export default customWinstonLogger
