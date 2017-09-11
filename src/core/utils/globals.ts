import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';

@Injectable()
export class Globals {
    public isMakingRequest: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setIsMakingRequest(isMakingRequest: boolean): void {
        this.isMakingRequest.next(isMakingRequest);
    }
}
