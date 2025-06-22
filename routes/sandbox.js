import express from "express"
import mongoose from "mongoose"
import error from "../utils/error.js"
import Sandbox from "../models/sandbox.js"
import Sand from "../models/sand.js"
import Stuff from "../models/stuff.js"


const router = express.Router()


// routes
router.route("/")
  .get(async (request, response) => {
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
      if (stuff) {sandbox.stuff = stuff}
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


export default router