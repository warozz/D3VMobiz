import { Http, RequestOptions ,Headers } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';
// import { EmptyObservable } from 'rxjs/Observable/EmptyObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, filter, take, switchMap, finalize } from "rxjs/operators";
import { RequestModel } from '../model/request-model';
import { URLConfig } from '../constants/url-config';
import { AuthorizationKey } from './authorization-key';
import { Storage } from '@ionic/storage';
/* 
 * author : tongm@ster 
 * ห้ามแก้ไข
 *  
*/ 
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector, private userService: AuthorizationKey, private http:Http,private storage: Storage) { 
    
  }

  private setAuthHeader(request) {
    return request.clone({ setHeaders: { Authorization: 'Bearer ' + this.userService.getAuthToken() }})
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(this.setAuthHeader(request))
      .pipe(
      catchError((error, ca) => {
 
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            
            case 401:
            
              return this.handle401Error(request, next)
         
             
            default:
              // return ErrorObservable.create(error);
              return Observable.throw(error);
          }
        } else {
    
          // return ErrorObservable.create(error);
          return Observable.throw(error);
        }
      })
      )
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      if(this.userService.getRole() == "A"){
        //alert(this.userService.getRole() );
        let request: RequestModel = new RequestModel();
      let configURL: URLConfig = new URLConfig(request);
      let url2 = configURL.proxy;
       let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       let req2 = "grant_type=client_credentials";
       req2 += "&client_id="+configURL.consumer_key;
       req2 +="&client_secret="+configURL.consumer_secret;
       let options = new RequestOptions({ headers: headers });
      return this.http.post(url2,req2,options)
        .pipe(
        switchMap((newToken) => {
          
            let obj : any = newToken;
            
            if (obj.status == 200) {
              //console.log(obj.json());
              let data : any = obj.json();
              //console.log(data.access_token);
              
              this.userService.setAuthToken(data.access_token,"");
              this.tokenSubject.next(data.access_token);
              return next.handle(this.setAuthHeader(req));
            }
  

          console.log('Could not refresh token 1')
          // return EmptyObservable.create();
          return Observable.throw('');
        }),
        catchError(error => {
          console.log('Could not refresh token 2')
          // return EmptyObservable.create();
          return Observable.throw('');
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
        )
      }
      else if(this.userService.getRole() == 'B' ){

        // let request: RequestModel = new RequestModel();
        // let configURL: URLConfig = new URLConfig(request);
        // let url2 = configURL.proxy;
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // let req2 = "grant_type=password&username="+this.username+"&password="+this.password;
        // req2 += "&client_id="+configURL.consumer_key;
        // req2 +="&client_secret="+configURL.consumer_secret;
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(url2,req2,options).map(resp => resp.json())
        //   .subscribe(res=>{
        //     let value : any  = res; 
        //     console.log(value);
        //     this.userService.setAuthToken(value.access_token,value.refresh_token);
        // });
        let request: RequestModel = new RequestModel();
        let configURL: URLConfig = new URLConfig(request);
        let url2 = configURL.proxy;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let req2 = "grant_type=refresh_token&refresh_token="+this.userService.getRefreshToken();
          req2 += "&client_id="+configURL.consumer_key;
          req2 +="&client_secret="+configURL.consumer_secret;
          let options = new RequestOptions({ headers: headers });
          return this.http.post(url2,req2,options)
          .pipe(
          switchMap((newToken) => {
            
              let obj : any = newToken;
              
              if (obj.status == 200) {
                //console.log(obj.json());
                let data : any = obj.json();
                //console.log(data.access_token);
                
                this.userService.setAuthToken(data.access_token,data.refresh_token);
                this.tokenSubject.next(data.access_token);
                return next.handle(this.setAuthHeader(req));
              }
    

            console.log('Could not refresh token 1')
            // return EmptyObservable.create();
            return Observable.throw('');
          }),
          catchError(error => {
            console.log('Could not refresh token 2')
            // return EmptyObservable.create();
            return Observable.throw('');
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
          )

      }

      
    } else {
      return this.tokenSubject
        .pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.setAuthHeader(req));
        })
        )
    }
  }
}