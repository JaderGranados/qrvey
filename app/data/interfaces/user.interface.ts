import { Document } from "mongoose";

export default interface UserInterface extends Document{
    name: string,
    lastName: string,
    username: string,
    projects?: [string]
}