// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../configs/database.config";
import Hospital from "../models/hospital";

// Global Config
export const hospitalsRouter = express.Router();
hospitalsRouter.use(express.json());

// GET
hospitalsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const hospitals = (await collections.hospitals?.find().toArray()) as unknown as Hospital[];

        res.status(200).send(hospitals);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
});

// POST
hospitalsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newHospital = req.body as Hospital;
        const result = await collections.hospitals?.insertOne(newHospital);

        result
            ? res.status(201).send(`Successfully created a new hospital with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new hospital.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            res.status(400).send(error.message);
        }
    }
});

// PUT
hospitalsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedHospital: Hospital = req.body as Hospital;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.hospitals?.updateOne(query, { $set: updatedHospital});

        result
            ? res.status(200).send(`Successfully updated hospital with id ${id}`)
            : res.status(304).send(`Hospital with id: ${id} not updated`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
});

// DELETE
hospitalsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.hospitals?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed hospital with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove hospital with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Hospital with id ${id} does not exist`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        res.status(400).send(error.message);
        }
    }
});