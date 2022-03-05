import express from "express";

import { join, dirname } from "path"

import { fileURLToPath } from "url";

import uniqid from "uniqid"

import fs from "fs"

import { validation } from "./validation.js";

import createHttpError from "http-errors";

const testRouter = express.Router()

const fileUrl = fileURLToPath(import.meta.url)
console.log(fileUrl)

const directory = dirname(fileUrl)
console.log(directory)

const contentsPath = join(directory, `test.json`)
console.log(contentsPath)

const getContent = () => JSON.parse(fs.readFileSync(contentsPath))
const writeContent = content => fs.writeFileSync(contentsPath, JSON.stringify(content))


testRouter.post(`/`, validation, (err, req, res, next) => {
    try {
        const errors = validation(req)
        if (validation.isEmpty()) {
            const newContent = { ...req.body, id: uniqid(), createdAt: new Date(), updatedAt: new Date() }

            const contentArray = getContent()

            contentArray.push(newContent)

            writeContent(contentArray)

            res.status(201).send(newContent)
        } else {
            next(createHttpError(400, "Some errors occurred in request body", { errors }))
        }

    } catch (error) {
        next(error)
    }
})


testRouter.get(`/`, (err, req, res, next) => {
    try {
        const contentArray = getContent()

        res.status(200).send(contentArray)
    } catch (error) {
        next(error)
    }
})

export default testRouter