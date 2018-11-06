import { ServiceName } from "../constants/service-name";

export class RequestModel {

    /**
     * สถานะเครือข่ายและอุปกรณ์
     * 0 = application tlprompt mini
     * 1 = application tlprompt
     * 2 = website
     */
    mode: number;
    serviceName: ServiceName; //INSERT, UPDATE, DELETE, SELECT
    functionName: string; //AGENT, TLPLAN, APPLICATION
    param: any;
    searchkey: string;
    keyvalue: string;
    agentid: string;
    lastsync: string;
    searchmode: string;
    syncMode: boolean = false; //SyncMode [true, false]

    pagingMode: boolean;
    sizeTotal: number;
    orderBy: string;
    orderType: string;
    pageNo: number;
    pageSize: number;
    filterBy: string;

    sourcePage: string;
   
}