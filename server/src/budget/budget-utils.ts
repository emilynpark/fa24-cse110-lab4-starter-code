import { Response } from 'express';

export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    if (body.amount >= 0 && typeof body.amount === 'number') {
        budget.amount = body.amount;
        res.status(200).send({ "data": budget.amount });
    } else {
        res.status(400).send({ "message": "Invalid budget amount" });
    }
}