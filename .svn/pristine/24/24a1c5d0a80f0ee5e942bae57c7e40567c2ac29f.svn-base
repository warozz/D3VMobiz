import { SQLiteHandle } from "./sqlite-handle";
import "rxjs/add/observable/interval";
import { OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

export class SQLiteState  implements OnInit, OnDestroy {

    static subscription: Subscription;

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
   
    static start() {
       console.log(" !!!!!!!!!!!!!!!!!! SQLiteHandle.recordTotalSize a = " + SQLiteHandle.recordTotalSize);

        let timer = Observable.timer(500, 500);
        SQLiteState.subscription = timer.subscribe(this.func);
    }

    static func() {

        console.log(" !!!!!!!!!!!!!!!!!! SQLiteHandle.recordTotalSize a = " + SQLiteHandle.recordTotalSize);
       
        if (SQLiteHandle.recordTotalSize > 0) {
            let result = SQLiteHandle.recordTotalSize / 100;
  
            console.log(" !!!!!!!!!!!!!!!!!! SQLiteHandle.recordTotalSize b = " + SQLiteHandle.recordTotalSize);
            console.log(" !!!!!!!!!!!!!!!!!! SQLiteHandle.recordBeWrite = " + SQLiteHandle.recordBeWrite);

            let percent = SQLiteHandle.recordBeWrite / result;
            console.log(SQLiteHandle.recordTotalSize + " =V= " + SQLiteHandle.recordBeWrite + " = " + percent + "%");
            if (percent >= 99) {
                if (SQLiteState.subscription != undefined) {
                    //SQLiteState.subscription.unsubscribe();
                }
                SQLiteState.subscription.unsubscribe();
            }
        }
        //else
            //SQLiteState.subscription.unsubscribe();
            
        // if (SQLiteHandle.recordBeWrite > 1000) {
        //     if (SQLiteState.subscription != undefined) {
        //         SQLiteState.subscription.unsubscribe();
        //     }
         
    }

    static stop() {
        //this.subscription.unsubscribe();
    }


}