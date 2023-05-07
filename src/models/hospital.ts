import { ObjectId } from "mongodb";

export default class Hospital {
    constructor(
        public id: ObjectId,
        public name: string,
        public doctorName: string
    ) {}
}