import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: { type: String, required: true },
    address: { type: String, required: true },
    guardian: { type: String, required: true },
    age: { type: String, required: true },
    about: { type: String, required: true },
    contact: { type: String, required: true, maxLength: 10 },
    addedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Student", userSchema)