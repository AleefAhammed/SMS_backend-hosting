import mongoose from "mongoose"
import Student from "../model/studentModel.js"

export const addStudent = async (req, res) => {

    const userData = req.body;
    const data = new Student({ ...userData });

    try {
        await data.save();
        res.status(200).json("Successfully saved details of the student")
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't save details of the student")
    }
}

export const getAllStudents = async (req, res) => {

    const { id } = req.params;

    try {
        const studentsList = await Student.find({ addedBy: id })
        res.status(200).json(studentsList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateStudent = async (req, res) => {

    const { id } = req.params;
    // console.log(id);
    const { name, about, address, age, contact, guardian } = req.body;
    // console.log({ name, about, address, age, contact, guardian });


    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Student not available');
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { $set: { 'name': name, 'about': about, 'address': address, 'age': age, 'contact': contact, 'guardian': guardian } }, { new: true }
        )
        res.status(200).json(updatedStudent)

    } catch (error) {

        res.status(405).json({ message: error.message })
    }
}

export const deleteStudent = async (req, res) => {

    const { id } = req.params;
    // console.log(id);
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Student is not available');
        }

        await Student.findByIdAndRemove(id)
        res.status(200).json('Student removed successfully')
    } catch (error) {

        res.status(405).json({ message: error.message })
    }
}

export const getOneStudent = async (req, res) => {

    const { id } = req.params;
    // console.log(id);
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Student is not available');
        }

        const student = await Student.findOne({ _id: id })
        res.status(200).json(student)
    } catch (error) {

        res.status(405).json({ message: error.message })
    }
} 