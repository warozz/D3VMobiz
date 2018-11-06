export class ResponseModel {
    size: number;
    status: number;
    data: any;

    pagingMode: boolean;
    sizeTotal: string;
    orderBy: string;
    orderType: string;
    pageNo: number;
    pageSize: number;
    pageTotal: number;
    totalRecord: number;
}