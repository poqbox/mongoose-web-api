import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import collections from "./routes/collections.js"
import {get_database_URI} from "./utils/utils.js"


const PORT = 3000
const database_name = "sample_training"
await mongoose.connect(get_database_URI(database_name))
const app = express()
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}.`) })


// routers
app.use("/api/collections", collections)


// routes
app.get("/", (request, response) => {
  // HATEOAS links
  let links = [
    {
      href: "/api",
      rel: "api",
      type: "GET",
    },
  ]

  response.json({ links })
})

app.put("/api/switch_database/:database", async (request, response) => {
  // switch active database
  const database = request.params.database
  await mongoose.connection.close()
  await mongoose.connect(get_database_URI(database))

  response.json(`Switched to ${database}.`)
})


// error-handling middleware
app.use((error, request, response, next) => {
  response.status(error.status || 500)
  response.json({ error: error.message })
})