import express from 'express'
import cors from 'cors'
import Controller from './controller/controller.base'
// import customLogger from './middleware/customLogger.middleware'
import customWinstonLogger from './middleware/winston.middleware'
import { winstonLogger } from './winston/logger'
 
class App {
  public app: express.Application

  public port: number
 
  constructor(controllers: Controller[], port: number) {
    this.app = express()
    
    this.port = port
 
    this.initializeMiddlewares()

    this.initializeControllers(controllers)
  }
 
  private initializeMiddlewares() {
    this.app.use(express.json({ limit: '1mb'}))
    
    this.app.use(express.urlencoded({ extended: true, limit: '1mb'}))
    
    this.app.use(cors())

    this.app.use(customWinstonLogger)
  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      winstonLogger.log('warn' ,`App listening on the port ${this.port}`)
    })
  }
}
 
export default App