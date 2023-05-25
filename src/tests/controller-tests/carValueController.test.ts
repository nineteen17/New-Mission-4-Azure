import { createRequest, createResponse } from 'node-mocks-http';
import { Request, Response } from 'express';
import carValueController from '../../controllers/carValueController';
import { calculateCarValue } from '../../services/calculateCarValue';
import { CarValueInput, CarValueOutput } from '../../types/types';

// Mock calculateCarValue
jest.mock('../../services/calculateCarValue', () => ({
  calculateCarValue: jest.fn(),
}));

describe('carValueController', () => {
  // Reset the mock before each test
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return car value', async () => {
    const mockRequestBody: CarValueInput = {
      model: 'Toyota Camry',
      year: 2015,
    };
    const mockCarValue: CarValueOutput = { car_value: 20000 };
    (calculateCarValue as jest.Mock).mockReturnValue(mockCarValue);

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
    const mockRequestBody: CarValueInput = {
      model: 'Unknown Model',
      year: 2023,
    };
    const mockError: CarValueOutput = { error: 'Invalid model or year' };
    (calculateCarValue as jest.Mock).mockReturnValue(mockError);
  
    const mockRequest = createRequest({
      method: 'POST',
      body: mockRequestBody,
    });
  
    const mockResponse = createResponse();
    await carValueController(mockRequest as Request, mockResponse as Response);
  
    expect(mockResponse._getJSONData()).toEqual(mockError);
    expect(mockResponse._getStatusCode()).toBe(400);
  });
  
});
