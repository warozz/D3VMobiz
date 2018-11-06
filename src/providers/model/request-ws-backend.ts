import { BodyM } from './body-model';
import { HeadersM } from './headers-model';
import { Headers } from '@angular/http';
import { ServiceName } from "../constants/service-name";

export class RequestWsbackendM {
	
	headers: HeadersM;
	body : BodyM;
	
}