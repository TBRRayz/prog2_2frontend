import { Component, OnInit } from '@angular/core';

import { IFestival } from './festival';
import { FestivalService } from './festival.service';



//import { FormGroup, FormControl, Validators, FormBuilder, FormsModule, ReactiveFormsModule }  from '@angular/forms';



@Component({
    selector: 'pm-festivals',
    moduleId: module.id,
    templateUrl: 'festivals-list.component.html',
    styleUrls: ['festivals-list.component.css']
})

export class FestivalListComponent{
    pageTitle: string = 'Festival list';
    errorMessage: string;
    festivalen: IFestival[];
    festival: IFestival;
  /*  
  addFestivalForm: FormGroup;
  name = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  genre = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
   
  festivals = [];
  isLoading = true;
       
  festival = {};
  isEditing = false;
 */
    
    constructor(private _festivalService: FestivalService){
        
    }
    
    
    
    add(name: string, location: string, genre: string, age:string, date:string): void {
        name = name.trim();
        location = location.trim();
        genre = genre.trim();
        age = age.trim();
        date = date.trim();
        
        
         if (!name || !location || !genre) { return; }
          this._festivalService.create(name, location, genre, age, date)
            .then(festival => {
             this.festivalen.push(festival);
             this.festival = null;
    });
}
    delete(hero: IFestival): void {
    this._festivalService
        .delete(hero._id)
        .then(() => {
          this.festivalen = this.festivalen.filter(h => h !== hero);
          if (this.festival === hero) { this.festival = null; }
        });
  }
  
  ngOnInit(): void{
        this._festivalService.getFestivals()
                .subscribe(festivalen => this.festivalen = festivalen,
                    error => this.errorMessage = <any>error);
                    console.log(this.festivalen);
        
    }

    /*
    addCat() {
    this._festivalService.addFestival(this.addFestivalForm.value).subscribe(
      res => {
        let newCat = res.json();
        this.festivals.push(newCat);
        this.addFestivalForm.reset();
        //this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }*/
    
}