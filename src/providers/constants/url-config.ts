import { FunctionName } from './function-name';
import { RequestModel } from "../model/request-model";
import { ConfigAPI } from './config-api';

export class URLConfig {

    url: string;
    method: string;
    consumer_key : string = "";
    consumer_secret : string = "";
    proxy : string = "";

    constructor(request: RequestModel) {

        let ip_port_TLPROMPT: string = ConfigAPI.IP_PORT_TLPROMPT;

        let functionName: string = request.functionName;
        let apiVersion: string = ConfigAPI.API_VERSION;
        this.consumer_key  = ConfigAPI.CONSUMER_KEY;
        this.consumer_secret  = ConfigAPI.CONSUMER_SECRET;
        this.proxy = ConfigAPI.IP_PORT_TLPROMPT + "/token";

        if (FunctionName.TLPROMPT_WS_AUTHENTICATION == functionName) {
            this.url = ip_port_TLPROMPT + "/tlprompt/authen/1";
        }
        else if (FunctionName.VERSION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/version/versionService";
        }
        else if (FunctionName.TLPLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/tlplan/tlplanService";
        }
        else if (FunctionName.POSPECT == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/prospect/prospectService";
        }
        else if (FunctionName.REGISTER_DA == functionName) {
            this.url =ip_port_TLPROMPT + "/registerda/"+ apiVersion +"";
        }
        else if (FunctionName.RESETPASSWORD_DA == functionName) {
            this.url = ip_port_TLPROMPT + "/resetpasswordda/"+ apiVersion +"";
        }
        else if (FunctionName.GETPROVINCE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/address/provinceService";
        }
        else if (FunctionName.HOSPITAL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/hospital/hospitalService";
        }
        else if (FunctionName.GETREGION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/address/regionService";
        }
        else if (FunctionName.QUOTATION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotation/quotationService/";
        }
        else if (FunctionName.APPLICATION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/application/applicationService/";
        }
        else if (FunctionName.ACTIONLOG == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/actionlog/actionlogService/";
        }
        else if (FunctionName.LOGINLOG == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/loginlog/loginlogService/";
        }
        else if (FunctionName.CHECKMOBILE_DA == functionName) {
            this.url = ip_port_TLPROMPT + "/getmobile/"+ apiVersion +"";
        }
        else if (FunctionName.GETALLPLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/tlplan/tlplanService/";
        }
        else if (FunctionName.APPLICATION_SESSION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/applicationSession/applicationSessionService/";
        }
        else if (FunctionName.AUTOLOGIN == functionName) {
            this.url = ip_port_TLPROMPT + "/autologin/"+ apiVersion +"";
        }
        else if (FunctionName.PLAN_RIDER == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planRider/planRiderService/";
        }
        else if (FunctionName.RIDER == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/rider/riderService/";
        }
        else if (FunctionName.RIDER_DETAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/riderDetail/riderDetailService/";
        }
        else if (FunctionName.PACKAGE_DETAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/packageDetailService/";
        }
        else if (FunctionName.PLAN_DETAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planDetail/planDetailService/";
        }
        else if (FunctionName.PMRATE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/pmrateService/";
        }
        else if (FunctionName.PREMIUM_PACKAGE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/premiumPackageService/";
        }
        else if (FunctionName.SUMRATEO == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/sumrateoService/";
        }
        else if (FunctionName.TAX_CONDITION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/taxconditionService/";
        }
        else if (FunctionName.TAX_FIXRATE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/taxfixrateService/";
        }
        else if (FunctionName.TAX_FORMULA == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/taxformulaService/";
        }
        else if (FunctionName.TAX_SUMCONDITION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/taxsumconditionService/";
        }
        else if (FunctionName.STEP_SUMASSURE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/stepsumassureService/";
        }
        else if (FunctionName.SUMRATE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/sumrateService/";
        }
        else if (FunctionName.PARATE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/parateService/";
        }
        else if (FunctionName.FEE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/feeService/";
        }
        else if (FunctionName.GENERATE_QUOTATION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotationPdf/quotationPdfService";
        }
        else if (FunctionName.PACKAGE_COVERAGE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/packageCoverageService/";
        }
        else if (FunctionName.PACKAGE_COVERAGE2 == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/packageCoverage2Service/";
        }
        else if (FunctionName.PREMIUMRATE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/premiumRateService/";
        }
        else if (FunctionName.PLANTYPE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/plantypeService/";
        }
        else if (FunctionName.PLANTYPE_DETAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/plantypeDetailService/";
        }
        else if (FunctionName.CHART == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/chart/chartService/";
        }
        else if (FunctionName.HEALTH == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/health/healthService/";
        }
        else if (FunctionName.EXTENDED == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/extended/extendedService/";
        }
        else if (FunctionName.FAVORITE_PLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/favoritePlan/favoritePlanService/";
        }
        else if (FunctionName.DISTRICT == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/address/amphurService/";
        }
        else if (FunctionName.SUBDISTRICT == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/address/tambonService/";
        }
        else if (FunctionName.COUPON == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/coupon/couponService/";
        }
        else if (FunctionName.COUPONTABLE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/coupontable/coupontableService/";
        }
        else if (FunctionName.MATURETABLE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/maturetable/maturetableService/";
        }
        else if (FunctionName.QUOTATIONGUARDIAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotationGuardian/quotationGuardianService/";
        }
        else if (FunctionName.MCAAPPLICATIONS == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/mcaapplications/mcaapplicationsService/";
        }
        else if (FunctionName.QUOTATIONRIDER == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotationRider/quotationRiderService/";
        }
        else if (FunctionName.SEND_EMAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/emailService/sendemail";
        }
        else if (FunctionName.GROUPPLAN_SEARCH == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/groupplanSearch/groupplanSearchService/";
        }
        else if (FunctionName.GROUPPLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/groupplanService/";
        }
        else if (FunctionName.GROUPPLAN_DETAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/groupplanDetailService/";
        }
        else if (FunctionName.TOPPLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/topplanService/";
        }
        else if (FunctionName.EMPDETAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/common/ldapEmployeeUATService/1.0";
        }
        else if (FunctionName.QUOTATION_PRINTLOG == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotationprintlog/quotationprintlogService/";
        }
        else if (FunctionName.OCCUPATIONS == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/occupations/occupationsService/";
        }
        else if (FunctionName.OTHER_INSURANCE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/otherinsurance/otherinsuranceService/";
        }
        else if (FunctionName.INSURANCE_REJECTIONS == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/insurancerejections/insurancerejectionsService/";
        }
        else if (FunctionName.ADDRESS == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/address/addressService/";
        }
        else if (FunctionName.PAYMENT == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/payment/paymentService/";
        }
        else if (FunctionName.BENEFICIARY == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/beneficiary/beneficiaryService/";
        }
        else if (FunctionName.APPLICATIONANSWER == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/applicationanswer/applicationanswerService/";
        }
        else if (FunctionName.ATTACHFILE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/attachfile/attachfileService/";
        }
        else if (FunctionName.MCAOCCUPATIONS == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/mcaoccupations/mcaoccupationsService/";
        }
        else if (FunctionName.QUESTIONS == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/questions/questionsService/";
        }
        else if (FunctionName.APPLICATIONMASTER == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/application/applicationMasterService/";
        }
        else if (FunctionName.APPLICATION_SUBMITMDA == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/application/applicationSubmitMDA/";
        }
        else if (FunctionName.APPLICATION_PDF == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/applicationPdf/applicationPdfService/";
        }
        else if (FunctionName.APPLICATION_PDF_ULINK == functionName) {
          this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/applicationPdf/applicationUlinkPdfService/";
        }
        else if (FunctionName.APPLICATION_IMAGE_SIGN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/applicationPdf/applicationSignImageService/";
        }
        else if (FunctionName.APPLICATION_CHECKCONDITION == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/application/applicationCheckCondition/";
        }
        else if (FunctionName.APPLICATION_EAPP == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/application/applicationEAppService/";
        }
        else if (FunctionName.CUSTOMERSERVICE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/customer/findCustomer/";
        }
        else if (FunctionName.TEMP_RECEIPTNO == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/application/applicationTempReceiptNo/";
        }
        else if (FunctionName.DONOTCALLBYID == functionName) {
            this.url = "http://" + ip_port_TLPROMPT + "RESTful_ULIP"+ apiVersion +"/rest/CustomerService/donotcallbyid/"
        }
        else if (FunctionName.UNITLINKAPI == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/unitlinkService/unitlink"
        }
        else if (FunctionName.APPLICATION_PDF_ALFRESCO == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/applicationPdf/applicationPdfAlfrescoService"
        }
        else if (FunctionName.UNIVERSAL_LIFE_PDF == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotationPdf/ulPdfService/"
        }
        else if (FunctionName.SALEINFO == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/saleinfo/saleinfoService"
        }
        else if (FunctionName.QUOTATION_UL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotationul/quotationulService"
        }
        else if (FunctionName.ULPLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/ulplan/ulplanService"
        }
        else if (FunctionName.LOGS == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/logs/logsService"
        }
        else if (FunctionName.ULINKPLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/ulinkplan/ulinkplanService"
        }
        else if (FunctionName.UNITLINKPDF == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/quotationPdf/unitlinkPdfService"
        }
        else if (FunctionName.PROSPECTULINKEXPERIENCE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/propectulinkexperience/propectulinkexperienceService"
        }
        else if (FunctionName.EAPPPLAN == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/planProvide/planEAPPService"
        }
        else if (FunctionName.RISKPROFILE == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/riskprofile/riskprofileService"
        }
        else if (FunctionName.PC60 == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/pc60/pc60Service"
        }
        else if (FunctionName.EXAMPLE_BENEFIT == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/examplebenefit/examplebenefitService"
        }
        else if (FunctionName.PRENAME == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/prename/prenameService"
        }
        else if (FunctionName.SELLDOCUMENT == functionName) { //ดาวน์โหลด PDF สื่อเอกสารงานขาย
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/sellingService/documents"
        }
        else if (FunctionName.ULINKAPPLICATIONFORM == functionName) { // เอกสารประกอบใบคำขอ 6 ตัว
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/ulinkappcationform/ulinkappcationformService"
        }
        else if (FunctionName.ULINKACCEPTRISK == functionName) { // แบบรับทราบความเสี่ยง
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/unitlinkacceptrisk/unitlinkacceptriskService"
        }
        else if (FunctionName.ALLFUND == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/allfund/allfundService"
        }
        else if (FunctionName.ALLOCATE == functionName) {
          this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/allocate/allocateService"
        }
        else if (FunctionName.APPLICATION_PDF_RISKPROFILE == functionName) { // ดูรายงานแบบประเมินความเสี่ยง
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/applicationPdf/assesmentriskService"
        }
        else if (FunctionName.ULINKAPPLICATIONDETAIL == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/unitlinkapplicationdetail/unitlinkapplicationdetailService"
        }
        else if (FunctionName.APPLICATION_PDF_ACCEPTRISK == functionName) { // ดูรายงานแบบฟอร์มการรับทราบความเสี่ยง
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/applicationPdf/acceptriskService"
        }
        else if (FunctionName.APPLICATION_PDF_UNITHOLDER == functionName) { // ดูรายงานแบบแสดงข้อมูลผู้ถือหน่วยลงทุน
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/applicationPdf/unitholderService"
        }
        else if (FunctionName.APPLICATION_PDF_UNITLINKPERMIUM == functionName) { // ดูรายงานใบคำร้องเกี่ยวกับเบี้ยประกันภัย
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/applicationPdf/unitlinkpermiumService"
        }
        else if (FunctionName.UNITLINK_LIFEPREMIUM == functionName) { //เก็บข้อมูลของพยานในหน้า ใบคำร้องเกี่ยวกับเบี้ย
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/" + apiVersion + "/rest/unitlinklifepremium/unitlinklifepremiumService"
        }
        else if (FunctionName.APPLICATION_ULINK_PDF_ALFRESCO == functionName) {
            this.url = ip_port_TLPROMPT + "/TLPromptBackendWs/"+ apiVersion +"/rest/applicationPdf/applicationUlinkPdfAlfrescoService"
        }
    }
}
