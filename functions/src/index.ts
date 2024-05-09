import { Request, Response } from "express";
import { logger } from 'firebase-functions';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = (request: Request, response: Response) => {
    logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
};

export const readData = functions.https.onRequest(async (request: Request, response: Response) => {
    try {
        const snapshot = await admin.database().ref('items').once('value');
        const items = snapshot.val();
        response.json(items);
    } catch (error) {
        console.error('Error reading data:', error);
        response.status(500).send('Error reading data');
    }
});
