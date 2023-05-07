import { MongoClient, Collection, Db } from "mongodb";
import dotenv from "dotenv";

export const collections: {
    hospitals?: Collection,
    pets?: Collection
} = {}

export async function connectToDatabase () {
    dotenv.config();
 
    const client: MongoClient = new MongoClient(process.env.DB_URL!);
            
    await client.connect();
        
    const db: Db = client.db(process.env.DB_NAME);
   
    const hospitalsCollection: Collection = db.collection(process.env.HOSPITALS_COLLECTION_NAME!);
    collections.hospitals = hospitalsCollection;

    const petsCollection: Collection = db.collection(process.env.PETS_COLLECTION_NAME!);
    collections.pets = petsCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName}`);
}