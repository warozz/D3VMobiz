import { RiskAssessmentModel } from './risk-assessment-model';
export class RiskProfileModel{
    citizenid : string;
    assessmentdate : string;
    riskscore : number;
    parttwo : number;
    partthree : number;
    status : string;
    riskassessmentMs: Array<RiskAssessmentModel>;

}