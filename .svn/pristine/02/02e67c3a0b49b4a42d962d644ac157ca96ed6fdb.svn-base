import {Platform} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { URLConfig } from '../constants/url-config';
import { FunctionName } from './../constants/function-name';
import { RequestModel } from '../model/request-model';
import { AuthorizationKey } from '../constants/authorization-key';
import { LogsModel } from '../service-table/logs-model';
import { Headers, Http,  RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LogService {
    
    constructor(
        public http: HttpClient, 
        public key : AuthorizationKey, 
        public plt: Platform) {}

    insert(logsM: LogsModel) {

        logsM.platform = JSON.stringify(this.plt.platforms());

        let request: RequestModel = new RequestModel();
        request.functionName = FunctionName.LOGS;

        let header: HttpHeaders = new HttpHeaders();
        header = header.set("Content-Type","application/json")
        .set("Authorization", this.key.getAuthToken());

        let configURL: URLConfig = new URLConfig(request);
        this.http.post(configURL.url, JSON.stringify(logsM), {headers : header})
        .subscribe(data => {
            console.log("Insert logs error success!!");
        }, (err) => {
            console.log(JSON.stringify(err));
        });
    }
}