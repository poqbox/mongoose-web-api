import express from "express"
import error from "../utils/error.js"
import Stuff from "../models/stuff.js"


const router = express.Router()


// routes
router.route("/")
  .get(async (request, response) => {
    const query = request.body
    const id = request.query["id"]
    const name = request.query["name"]

    if (query)
      response.json(await Stuff.find(request.body))
    else if (id)
      response.json(await Stuff.find({id: id}))
    else if (name)
      response.json(await Stuff.find({name: name}))
    else
      response.json(await Stuff.find(request.body))
  })
  .post(async (request, response, next) => {
    const name = request.body.name
    const stuff = request.body.stuff

    if (name) {
      const stuff_doc = new Stuff({
        name: name
      })
      if (stuff)
        stuff_doc.stuff = stuff
      await stuff_doc.save()

      response.json(stuff_doc)
    }
    else {
      next(error(400, "Insufficient data."))
    }
  })

router.route("/:id")
  .get(async (request, response) => {
    response.json(await Stuff.findById(request.params.id))
  })
  .patch(async (request, response) => {
    response.json(await Stuff.updateOne({_id: request.params.id}, request.body))
  })
  .delete(async (request, response) => {
    response.json(await Stuff.deleteOne({_id: request.params.id}))
  })

router.route("/:id/push")
  .patch(async (request, response) => {
    response.json(await Stuff.updateOne(
      {_id: request.params.id},
      {$push: {stuff: request.body}}
    ))
  })

router.route("/:id/pull")
  .patch(async (request, response) => {
    response.json(await Stuff.updateOne(
      {_id: request.params.id},
      {$pull: {stuff: request.body}}
    ))
  })


export default router