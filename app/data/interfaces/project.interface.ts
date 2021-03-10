import { Document } from "mongoose";

export interface ProjectInterface extends Document{
    name: string,
    user: string,
    tasks: [string],
    active?: boolean
}