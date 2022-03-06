import express from "express";

import { join, dirname } from "path"

import { fileURLToPath } from "url";

import uniqid from "uniqid"

import fs from "fs"

import { validationResult } from "express-validator";

import { validation } from "./validation.js";

import createHttpError from "http-errors";



const fileUrl = fileURLToPath(import.meta.url)
console.log(fileUrl)

const directory = dirname(fileUrl)
console.log(directory)

const contentsPath = join(directory, "test.json")
console.log(contentsPath)

const testRouter = express.Router()

const getContent = () => JSON.parse(fs.readFileSync(contentsPath))
const writeContent = (content) => fs.writeFileSync(contentsPath, JSON.stringify(content))


testRouter.post(`/`, validation, async (err, req, res, next) => {
    try {
        const errors = validationResult(req)
        if (validation.isEmpty()) {
            const newContent = await { ...req.body, id: uniqid(), createdAt: new Date(), updatedAt: new Date() }

            const contentArray = getContent()

            contentArray.push(newContent)

            writeContent(contentArray)

            res.status(201).send(contentArray)
        } else {
            next(createHttpError(400, "Some errors occurred in request body", { errors }))
        }

    } catch (error) {
        next(error)
    }
})


testRouter.get(`/`, async (err, req, res, next) => {
    try {
        const contentArray = await getContent()
        
        res.status(200).send(contentArray)
       
    } catch (error) {
        next(error)
    }
})



export default testRouter