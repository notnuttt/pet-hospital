import { ObjectId } from "mongodb";
import Hospital from "./hospital";

export default class Pet {
    constructor(
        public id: ObjectId,
        public name: string,
        public weight: number,
        public ownerName: string,
        public petType: string,
        public symptoms: string[],
        public patienOf: Hospital
    ) {}
}