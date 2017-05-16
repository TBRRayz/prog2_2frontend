import { Component } from '@angular/core';

import {FestivalService } from './festivals/festival.service';

@Component({
    selector: 'pm-app',
    template: `
    <div>
         <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/festivals']">Festival List</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
    </div>    
    `,
    providers: [ FestivalService ]
    
})
export class AppComponent {
    pageTitle: string = 'Acme Festival Management'; 
 }
