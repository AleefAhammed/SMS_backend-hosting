import express from "express";
import { addStudent, deleteStudent, getAllStudents, getOneStudent, updateStudent } from "../controller/studentControll.js";

const router = express.Router()

router.post('/add', addStudent)
router.get('/getall/:id', getAllStudents)
router.patch('/update/:id', updateStudent)
router.delete('/delete/:id', deleteStudent)
router.get('/getone/:id',getOneStudent)

export default router