import { Request, Response } from "express";
import { logger } from "firebase-functions";

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = (request: Request, response: Response) => {
    logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
};
