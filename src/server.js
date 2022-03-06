import express from "express";

import listEndpoints from "express-list-endpoints";

import testRouter from "./content/index.js";

import cors from "cors"

import { errorHandler, forbidden, notFound, notWorking } from "./errorHandler.js";

const server = express()

const PORT = 3001

server.use(express.json())

server.use(cors())

server.use("/test", testRouter)

server.use(notFound)

server.use(forbidden)

server.use(notWorking)

server.use(errorHandler)

console.table(listEndpoints(server))

server.listen(PORT, () => {
    console.log("🟢 Server is listening on port: ", PORT)
})

server.on("error", error => {
    console.log("🔴 Server is not running due to: ", error)
})