import express from "express"
import error from "../utils/error.js"
import Sandbox from "../models/sandbox.js"


const router = express.Router()


// routes
router.route("/")
  .get(async (request, response) => {
    const query = request.body
    const id = request.query["id"]
    const name = request.query["name"]

    if (query)
      response.json(await Sandbox.find(request.body))
    else if (id)
      response.json(await Sandbox.find({id: id}))
    else if (name)
      response.json(await Sandbox.find({name: name}))
    else
      response.json(await Sandbox.find(request.body))
  })
  .post(async (request, response, next) => {
    const name = request.body.name
    const length = request.body.length
    const width = request.body.width
    const height = request.body.height
    const stuff = request.body.stuff

    if (name && length && width && height) {
      const sandbox = new Sandbox({
        name: name,
        size: {
          length: length,
          width: width,
          height: height
        }
      })
      if (stuff)
        sandbox.stuff = stuff
      await sandbox.save()

      response.json(sandbox)
    }
    else {
      next(error(400, "Insufficient data."))
    }
  })

router.route("/:id")
  .get(async (request, response) => {
    response.json(await Sandbox.findById(request.params.id))
  })
  .patch(async (request, response) => {
    response.json(await Sandbox.updateOne({_id: request.params.id}, request.body))
  })
  .delete(async (request, response) => {
    response.json(await Sandbox.deleteOne({_id: request.params.id}))
  })


export default router