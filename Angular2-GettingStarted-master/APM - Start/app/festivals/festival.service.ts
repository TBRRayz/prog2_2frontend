import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IFestival } from './festival';

@Injectable()
export class FestivalService {
    
    private _festivalUrl = 'http://145.24.222.153:8000/api/festivals';
    
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    
    constructor (private _http: Http){}
    
    getFestivals(): Observable<IFestival[]>{
        
        return this._http.get(this._festivalUrl)
            .map((response: Response) => <IFestival[]> response.json().items)
            .do(data => console.log('all: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getFestival(id: any): Observable<IFestival> {
        
        return this.getFestivals()
            .map((festivals: IFestival[]) => festivals.find(p => p._id === id));
    }
    
    create(name: string, location: string, genre: string, age:string, date:string): Promise<IFestival>{
        return this._http
      .post(this._festivalUrl, JSON.stringify({name:name, location:location, genre:genre, age:age, date:date}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      
      .catch(this.handleError);
        
    }
    delete(id: any): Promise<void> {
    const url = `${this._festivalUrl}/${id}`;
    return this._http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  
   update(festival: IFestival): Promise<IFestival> {
    const url = `${this._festivalUrl}/${festival._id}`;
    return this._http
      .put(url, JSON.stringify(festival), {headers: this.headers})
      .toPromise()
      .then(() => festival)
      .catch(this.handleError);
  }
    
    
   
    
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'server error');
    }
    
}