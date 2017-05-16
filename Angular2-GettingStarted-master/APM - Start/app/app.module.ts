import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { FestivalListComponent } from './festivals/festivals-list.component';
import { FestivalDetailComponent } from './festivals/festivals-detail.component';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'festivals', component: FestivalListComponent },
      { path: 'festivals/:id', component: FestivalDetailComponent },
      { path: '', redirectTo: 'festivals', pathMatch: 'full' },
      { path: '**', redirectTo: 'festivals', pathMatch: 'full' }
    ]) 
    ],
  
  declarations: [ 
    AppComponent,
    FestivalListComponent,
    FestivalDetailComponent ],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
