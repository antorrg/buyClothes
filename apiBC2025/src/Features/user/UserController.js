import { BaseController } from '../../Shared/Controllers/BaseController.js'
import eh from '../../Configs/errorHandlers.js'

export class UserController extends BaseController {
  constructor (service) {
    super(service)
  }

  login = eh.catchController(async (req, res) => {
    const data = req.body
    const response = await this.service.login(data)
    return BaseController.responder(res, 200, true, response.message, response.results)
  })

  upgrade = eh.catchController(async (req, res) => {
    const { id } = req.params
    const data = req.body
    const response = await this.service.upgrade(id, data)
    return BaseController.responder(res, 200, true, response.message, response.results)
  })
}
