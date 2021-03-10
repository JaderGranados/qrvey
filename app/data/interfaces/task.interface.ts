import { Document } from "mongoose";

export default interface TaskInterface extends Document{
    status: string,
    timerecords?: [string],
    active: boolean,
    name: string,
    project: string,
    createAt: Date,
    startDate?: Date,
    duration?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
}