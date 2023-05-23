import { Request, Response } from 'express';
import { calculateQuote } from '../services/calculateQuote';
import { CarValueInput, RiskInput } from '../types/types';

const getQuoteController = (req: Request, res: Response): void => {
  // Assuming car_value and risk_rating are in req.body
  const { car_value, risk_rating } = req.body as { car_value: CarValueInput, risk_rating: RiskInput };

  // Perform input validation if necessary

  const quote = calculateQuote(car_value, risk_rating);
  
  res.send(quote);
};

export default getQuoteController;
