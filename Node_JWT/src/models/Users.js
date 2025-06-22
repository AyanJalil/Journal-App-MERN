import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    title : { type: String, required: true},
    content : { type: String, required: true},
    date : { type: Date, default: Date.now},
})

const userSchema = new mongoose.Schema({
    firstname : {type: String, required: true},
    lastname : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    journals : {type: [journalSchema], default: []},
})

export default mongoose.model("User", userSchema);