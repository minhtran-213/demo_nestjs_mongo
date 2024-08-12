import mongoose from "mongoose";

export interface AuthPayload {
    id: mongoose.Types.ObjectId;
    name: null | string;
    email: string;
    username: string
 }
