import { createRequest, createResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import riskRatingController from '../../controllers/riskRatingController'
import { evaluateRisk } from '../../services/calculateRiskRating'
import { RiskInput, RiskOutput } from '../../types/types'


jest.mock('../../services/calculateRiskRating', () => ({
  evaluateRisk: jest.fn(),
}));

describe('riskRatingController', () => {
  it('should return risk rating', async () => {
    const mockRequestBody: RiskInput = {
      claim_history: 'crash, smash',
    }
    const mockRiskRating: RiskOutput = { risk_rating: 2 }
    ;(evaluateRisk as jest.Mock<RiskOutput>).mockReturnValue(mockRiskRating)

    const mockRequest = createRequest({
      method: 'POST',
      body: mockRequestBody,
    })

    const mockResponse = createResponse()
    await riskRatingController(mockRequest as Request, mockResponse as Response)

    expect(mockResponse._getJSONData()).toEqual({
      risk_rating: mockRiskRating.risk_rating,
    })
    expect(mockResponse._getStatusCode()).toBe(200)
  })

  it('should return 400 and an error message if there is an error', async () => {
    const mockError = new Error('There was an error processing your request')
    ;(evaluateRisk as jest.Mock<RiskOutput>).mockImplementation(() => {
      throw mockError
    })

    const mockRequestBody: RiskInput = {
      claim_history: '',
    }

    const mockRequest = createRequest({
      method: 'POST',
      body: mockRequestBody,
    })

    const mockResponse = createResponse()
    await riskRatingController(mockRequest as Request, mockResponse as Response)

    expect(mockResponse._getJSONData()).toEqual({ error: mockError.message })
    expect(mockResponse._getStatusCode()).toBe(400)
  })
})
