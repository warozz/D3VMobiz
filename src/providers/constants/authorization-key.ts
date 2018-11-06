import { AgentModel } from './../agent/agent-model';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { RequestOptions , Headers } from "@angular/http";
import { Storage } from '@ionic/storage';

/* 
 *
 *  author : tongm@ster 
 *  ห้ามแก้ไข
 *  
*/ 
@Injectable()
export class AuthorizationKey  {
  
    // Assuming this would be cached somehow from a login call.
    public authTokenStale: string = '';
    public refreshToken : string ='';
    public role : string = '';

    constructor(private storage: Storage) {
        this.storage.get('loginProfile').then(res => {
            if (res != null) {
                let profile: AgentModel = res;
                if (profile.roleType == 'agent')
                    this.role = 'A';
                else
                    this.role = 'B';
            }
        });

        this.storage.get('authToken').then(res => {
            if (res != null) {
                this.authTokenStale = res.authTokenStale;
                this.refreshToken = res.refreshToken
            }
        });
    }

    getAuthToken() {
        return this.authTokenStale;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    getRole() {
        return this.role;
    }

    setAuthToken(access_token : string, refresh_token: string){
        this.authTokenStale = access_token;
        this.refreshToken = refresh_token;
        this.storage.set('authToken', { authTokenStale: access_token, refreshToken: refresh_token });
    }
    setRole(role : string){
        this.role = role;
    }

    // refreshToken(): Observable<string> {
    //      return Observable.of(this.authTokenStale).delay(200);
    // }
   

    
}