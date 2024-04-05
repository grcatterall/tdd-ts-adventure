import { CohereClient } from "cohere-ai";
require('dotenv').config();


const cohere = new CohereClient({
    token: process.env.COHERE_KEY,
});

export async function generateChat(name: string, message: string): Promise<string> {
    console.log('CHATTING');
    console.log(process.env.COHERE_KEY);
    try {
        if (message === '') {
            message = 'The player has just walked into your room and you must threaten them before going into attack them';
        } else {
            message = 'The message after the colon is the message from the player that you must respond to:';
        }
        const prediction = await cohere.generate({
            prompt: `You are a ${name} in a text based adventure game. You need to converse with the player. Make sure the dialogue is less than 50 characters. ${message}`,
            maxTokens: 50,
        });
        
        return prediction.generations[0].text;
    } catch (error: any) {
        console.log(error);
        throw new Error("Failed to generate prediction: " + error.message);
    }
}