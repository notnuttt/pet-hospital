// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../configs/database.config";
import Pet from "../models/pet";

// Global Config
export const petsRouter = express.Router();
petsRouter.use(express.json());

// GET
petsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const pets = (await collections.pets?.find().toArray()) as unknown as Pet[];

        res.status(200).send(pets);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
});

// POST
petsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newPet = req.body as Pet;
        const result = await collections.pets?.insertOne(newPet);

        result
            ? res.status(201).send(`Successfully created a new pet with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new pet.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            res.status(400).send(error.message);
        }
    }
});

// PUT
petsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedPet: Pet = req.body as Pet;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.pets?.updateOne(query, { $set: updatedPet});

        result
            ? res.status(200).send(`Successfully updated pet with id ${id}`)
            : res.status(304).send(`pet with id: ${id} not updated`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
});

// DELETE
petsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.pets?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed pet with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove pet with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Pet with id ${id} does not exist`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        res.status(400).send(error.message);
        }
    }
});