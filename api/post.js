import express from "express"
import { getEmployees, addEmployees } from "../db/employees.js"
const router = express.Router()

router.route("/").get((req,res) => {
    res.send(getEmployees())
})
.post((req, res) => {
    const { name } = req.body || {}
    
    if (!name || typeof name !== "string") {
        return res.status(400).send("Request body or name is not correctly provided")
    }else {
        const newEmployee = addEmployees(name)
        res.status(201).send(newEmployee)
    }
})

export default router