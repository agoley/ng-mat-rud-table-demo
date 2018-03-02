import { Component, ElementRef, Input } from "@angular/core";


@Component({
    selector: 'data-table-column',
    templateUrl: 'data-table-column.component.html',
    styleUrls: ['./data-table-column.component.scss']
    
})

export class DataTableColumnComponent {
    @Input() header: string;
    @Input() accessor: any;
    @Input() type: string;
    @Input() getItems: Function;
    
    constructor(elementRef: ElementRef) {
        elementRef.nativeElement.classList.add('data-table-column');
     }
}