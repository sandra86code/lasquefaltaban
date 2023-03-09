import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class ShowingService { 

    private showing: boolean = false;

    constructor(){}

    showingStatus(){
        return this.showing;
    }

    show() {
        this.showing = true;
    }

    hide() {
        this.showing = false;
    }


}