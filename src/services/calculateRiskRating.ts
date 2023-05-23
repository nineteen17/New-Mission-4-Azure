import { RiskInput, RiskOutput } from "../types/types";

export const evaluateRisk = (input: RiskInput): RiskOutput => {
  // keywords to look for in claim_history
  const keywords: string[] = ["collide", "crash", "scratch", "bump", "smash", "accident","damaged",  "crashed"];
  let risk_rating = 0;

  //  Check for errors 
  if (!input.claim_history || typeof input.claim_history !== "string") {
    return { error: "there is an error in risk rating" };
  }

  // Calculate risk_rating by looking for keywords in claim_history using regex 
  keywords.forEach((keyword) => {
    let keywordMatches = input.claim_history.match(new RegExp(keyword, "gi")); // case insensitive
    if (keywordMatches) {
      risk_rating += keywordMatches.length;
    }
  });

  // Ensure risk_rating is between 1 and 5
  risk_rating = Math.min(Math.max(risk_rating, 1), 5);

  return { risk_rating }; 
}
