import { createRequest, createResponse } from 'node-mocks-http';
import { Request, Response } from 'express';
import carValueController from '../../controllers/carValueController';
import { calculateCarValue } from '../../services/calculateCarValue';
import { CarValueInput, CarValueOutput } from '../../types/types';


jest.mock('../../services/calculateCarValue', () => ({
  calculateCarValue: jest.fn(),
}));

describe('carValueController', () => {
  it('should return car value', async () => {
    const mockCarValue: CarValueOutput = { car_value: 10100 };
    (calculateCarValue as jest.Mock).mockReturnValue(mockCarValue);

    const mockRequestBody: CarValueInput = {
      model: 'a',
      year: 100,
    };

    const mockRequest = createRequest({
      method: 'POST',
      body: mockRequestBody,
    });

    const mockResponse = createResponse();
    await carValueController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse._getJSONData()).toEqual({ car_value: mockCarValue.car_value });
    expect(mockResponse._getStatusCode()).toBe(200);
  });

  it('should return 400 and an error message if there is an error', async () => {
    const mockError: CarValueOutput = { error: 'Missing model or year' };
    (calculateCarValue as jest.Mock).mockReturnValue(mockError);

    const mockRequestBody: CarValueInput = {
      model: '', 
      year: 2023,
    };

    const mockRequest = createRequest({
      method: 'POST',
      body: mockRequestBody,
    });

    const mockResponse = createResponse();
    await carValueController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse._getJSONData()).toEqual({ error: mockError.error });
    expect(mockResponse._getStatusCode()).toBe(400);
  });
});
