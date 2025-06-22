import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import {get_database_URI} from "./utils/utils.js"
import collections from "./routes/collections.js"
import sandbox from "./routes/sandbox.js"
import stuff from "./routes/stuff.js"


const PORT = 3000
const database_name = "sandbox"
await mongoose.connect(get_database_URI(database_name))
const app = express()
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}.`) })
app.use(express.json())


// routers
app.use("/api/collections", collections)
app.use("/api/sandbox", sandbox)
app.use("/api/stuff", stuff)


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