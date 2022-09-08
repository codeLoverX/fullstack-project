import {Request, Response, NextFunction} from 'express'

function customLogger(request: Request, _: Response,  next: NextFunction) {
  console.log(`${request.method} ${request.path}`)

  next()
}

export default customLogger
