import { QuotationModel } from './../quotation/quotation-model';
import { BarChartDataM } from "./bar-chart-datam";

export class ChartM {
    //applicationMs : List<McaapplicationM>
    barChartDatas : Array<BarChartDataM>
    barChartLabels: Array<string> = [];
    customerAmt: string;
    prospectAmt: string;
    quotationMs : Array<QuotationModel> = [];
    totalAmt: string 
}