import { ServiceName } from "../constants/service-name";

export class BodyM {
    agentid: string;
    searchkey: string;
    keyvalue: string;
    action: ServiceName;
    datas: any;
    data: any;
    lastsync: string;
    searchmode: string;

    pagingMode: boolean;
    sizeTotal: number;
    orderBy: string;
    orderType: string;
    pageNo: number;
    pageSize: number;
    filterBy: string;

    sourcePage: string;
}