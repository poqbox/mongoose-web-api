import "dotenv/config"


function get_database_URI(database_name) {
  const i = process.env.MONGO_URI.lastIndexOf("/") + 1
  return process.env.MONGO_URI.slice(0, i) + database_name + process.env.MONGO_URI.slice(i)
}


export {get_database_URI}