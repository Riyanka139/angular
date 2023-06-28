import { Directive, HostBinding, HostListener,ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropDown]',
})
export class DropDownDirective{
    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click',['$event']) toggleOpen(){
        this.isOpen = this.eleRef.nativeElement.contains(event.target) ?  !this.isOpen : false;
    }

    constructor(private eleRef: ElementRef){}
}