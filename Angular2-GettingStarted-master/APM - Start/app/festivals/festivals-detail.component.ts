import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { IFestival } from './festival';
import { FestivalService } from './festival.service';
@Component({
    templateUrl: 'app/festivals/festivals-detail.component.html'
})
export class FestivalDetailComponent {
    pageTitle: string = 'festival detail';
    festival: IFestival;
    festivalen: IFestival[];
    errorMessage: string;
    
    private sub: Subscription;
    
    
    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _FestivalService: FestivalService){
                    
                }
        
    
    
    ngOnInit(): void{
        this.sub = this._route.params.subscribe(
            params =>{
                
                let id = params['id']
                
                this.getFestival(id);
            }
        )
       // let id = +this._route.snapshot.params['id'];
        //this.pageTitle += ': ${id}';
        
    }
     ngOnDestroy() {
        this.sub.unsubscribe();
    }

    
    getFestival(id: any) {
        console.log(id);
        this._FestivalService.getFestival(id).subscribe(
            festival => this.festival = festival,
            error => this.errorMessage = <any>error);
    }
    
    onBack(): void{
        this._router.navigate(['/festivals']);
    }
    
    save(): void {
    this._FestivalService.update(this.festival)
      .then(() => this.onBack());
  }
    
    
    
}
