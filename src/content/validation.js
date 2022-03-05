import { body } from "express-validator";

export const validation = () => {
    body("name").isString().withMessage("Name is mandatory!")
}