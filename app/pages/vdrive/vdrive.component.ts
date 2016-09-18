import {Component} from '@angular/core';

@Component({
	selector: 'vdrive-component',
    templateUrl: "pages/vdrive/vdrive.html" 
})
export class VdriveComponent {
    public selectedIndex: number;
    
    constructor() {
        this.selectedIndex = 1;
    }
}