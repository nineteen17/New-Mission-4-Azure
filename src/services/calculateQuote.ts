import { calculateCarValue } from "./calculateCarValue";
import { CarValueInput, CarValueOutput } from "../types/types";
import { evaluateRisk } from "./calculateRiskRating";
import { RiskInput, RiskOutput } from "../types/types";

//Yearly premium is calculated by car_value multiplied by driver rating divided by 100.   For example, car value of $6,614 and driver rating of 5, the yearly premium will be $6,614 * 5 / 100 = $330.  The monthly premium is the yearly premium divided by 12.  So the monthly premium in this example will be $300 /12 = $27.5.  If input values are not valid, return an error.


export let calculateQuote = (car_value: CarValueInput, risk_rating: RiskInput): CarValueOutput & RiskOutput & { yearlyPremium?: number, monthlyPremium?: number } => {
    // Calculate car_value and risk_rating using services functions
    let carValueResult = calculateCarValue(car_value);
    let riskRatingResult = evaluateRisk(risk_rating);
         
    // Check for errors and return early if any
    if ('error' in carValueResult) {
        return { ...carValueResult, ...riskRatingResult };
    }

    if ('error' in riskRatingResult) {
        return { ...carValueResult, ...riskRatingResult };
    }

    // If we have valid car_value and risk_rating
    if ('car_value' in carValueResult && 'risk_rating' in riskRatingResult) {
        let yearlyPremium = (carValueResult.car_value as number) * (riskRatingResult.risk_rating as number) / 100;
        let monthlyPremium = yearlyPremium / 12;

        return {
            ...carValueResult,
            ...riskRatingResult,
            yearlyPremium,
            monthlyPremium
        };
    }

    // If we have valid car_value but not risk_rating
    return {
        ...carValueResult,
        ...riskRatingResult,
    };
}


