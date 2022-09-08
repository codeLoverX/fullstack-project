import { Router } from 'express'

class Controller {
    protected path: string

    public router = Router()

    constructor(path: string){
        this.path = path
    }
}

export default Controller
