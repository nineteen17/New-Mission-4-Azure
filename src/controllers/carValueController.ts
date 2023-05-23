import { Request, Response } from "express";
import { calculateCarValue } from "../services/calculateCarValue";
import { CarValueInput, CarValueOutput } from "../types/types";

const carValueController = (req: Request, res: Response) => {
  // Retrieve model and year from request body or query parameters
  const { model, year }: CarValueInput = req.body;

  // Create an input object
  const input: CarValueInput = { model, year };

  // Invoke the calculateCarValue function
  const result: CarValueOutput = calculateCarValue(input);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.json({ car_value: result.car_value }); //
};

export default carValueController;
