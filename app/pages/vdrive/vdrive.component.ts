import {Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import {SetupItemViewArgs} from "nativescript-angular/directives";
import dialogs = require("ui/dialogs");
import { Router } from "@angular/router";
import {Location} from '@angular/common';

class Item {
    constructor(public name: string) { }
}

var items = ["ALL Heroes (header)", "Razor", "Rubick", "Phantom Lancer", "Legion Commander", "Brewmaster", "Outworld Devourer",
"Sniper", "Lina", "Sven", "Visage","Undying", "Tiny", "Tidehunter", "Puck", "Ursa", 
"Magnus", "Earthshaker", "Windrunner", "Techies", "Crystal Maiden","Batrider", "Riki", "Invoker", "Venomancer", 
"Timbersaw","Wraithking", "Anti Mage", "Ancient Apparition", "Troll Warlord", "Lich", "Enchantress", "Bristleback", "Pudge", "(footer)"];


@Component({
	selector: 'vdrive-component',
    styleUrls:["pages/vdrive/vdrive-component.css"],
    templateUrl: "pages/vdrive/vdrive.html" ,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VdriveComponent {

    public dataItems: Array<Item>;

    public checked: boolean = false;
    
    constructor(public elementRef: ElementRef,private router: Router,private location: Location) {
        this.dataItems = [];

        for (var i = 0; i < items.length; i++) {
            this.dataItems.push(new Item(items[i]));
        }
    }

    onSetupItemView(args: SetupItemViewArgs) { 
        args.view.context.third = (args.index % 3 === 0);
        args.view.context.header = ((args.index + 1) % items.length === 1);
        args.view.context.footer = (args.index + 1 === items.length);
    }

    displayCallDialog() {
        var options = {
            title: "Call",
            message: "Call.....",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Race chosen!");
        });
    }

    displayEmailDialog() {
        var options = {
            title: "Email",
            message: "Email.....",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Email chosen!");
        });
    }

    displayUsageGuideDialog() {
        var options = {
            title: "Usage Guide",
            message: "Email.....",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Usage Guide chosen!");
        });
    }

    displayPricingDialog() {
        var options = {
            title: "Pricing",
            message: "Pricing.....",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Pricing chosen!");
        });
    }

    displayTermAndConditionDialog() {
        var options = {
            title: "TERM AND CONDITIONS",
            message: "Term and conditions.....",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Term and conditions chosen!");
        });
    }

    goBack(){
        this.location.back();
    }

    logoff() {
        this.router.navigate(["/login"]);
    }
}