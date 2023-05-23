import { evaluateRisk } from "../../services/calculateRiskRating";
import { TestRiskRating } from "../../types/types";

const testCases: TestRiskRating[] = [
  {
    input: {
      claim_history:
        "I got into an accident where i smashed into a fence.", // 2 keywords in a sentence
    },
    output: { risk_rating: 2 },
  },
  {
    input: { claim_history: "I've had no incidents in the past three years." }, // no keywords should equal default risk rating
    output: { risk_rating: 1 },
  },
  {
    input: { claim_history: "crash, crashed, scratch, bump, smash, accident, damage, collide" }, // test the risk rating is maxed out at 5
    output: { risk_rating: 5 }, 
  },
  {
    input: { claim_history: "CrAsH, sMasH" }, // case sensitive
    output: { risk_rating: 2 },
  },
  {
    input: { claim_history: "" }, // empty string
    output: { error: "there is an error in risk rating" },
  },
];

describe("calculateRiskRating", () => {
  testCases.map(({ input, output }) => {
    it(`should calculate the risk rating correctly for the test case : ${input.claim_history}`, () => {
      const result = evaluateRisk(input);
      expect(result).toEqual(output);
    });
  });
});
