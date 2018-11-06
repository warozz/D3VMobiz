export class ApplicationpdfM {
    applicationid : string;
    pdfFileName : string;
    binaryQuotationPDF : string;
    /**
     * payment : ถ้าทำ e-app ระบบจะบันทึกเป็น status จ่ายเงิน ไม่ต้องบันทึก status sendToBranch ถ้าเป็น payment
     * sendToBranch : ถ้าไม่ทำ e-app และส่งข้อมูลไปสาขา
     */
    saveAlfrescoStatus : string; 
    signInsured:string;
    signWitness1:string;
    signWitness2:string;
    signAgent:string;
}