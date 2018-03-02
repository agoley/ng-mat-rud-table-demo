import { Component, SimpleChanges, ElementRef, EventEmitter, OnChanges, AfterViewInit, ContentChildren, Input, Output, QueryList } from "@angular/core";
import { DataTableColumnComponent } from "../data-table-column/data-table-column.component";


@Component({
    selector: 'data-table',
    templateUrl: 'data-table.component.html',
    styleUrls: ['./data-table.component.scss']

})

export class DataTableComponent implements AfterViewInit, OnChanges {
    @ContentChildren(DataTableColumnComponent) columnComponents: QueryList<DataTableColumnComponent>;
    @Input() data: any[];
    @Input() editable: boolean;
    @Output() saveRecord: EventEmitter<any> = new EventEmitter<any>();
    @Output() deleteRecord: EventEmitter<any> = new EventEmitter<any>();
    @Input() pageSize: number;

    columns: any;
    editIndex: number
    currentSlice: any[];
    currentStart: number = 0;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.pagify();
    }

    pagify() {
        if (this.pageSize && this.data) {
            var pageEnd = (this.currentStart + this.pageSize * 1);
            var sliceEnd = pageEnd < this.data.length ? pageEnd : this.data.length;
            this.currentSlice = this.data.slice(this.currentStart, sliceEnd);
        } else {
            this.currentSlice = this.data;
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => { this.columns = [].slice.call(this.elementRef.nativeElement.children).filter(e => e.classList.contains('data-table-column')) }, 0);
    }

    getColumnHeader(col: HTMLElement): string {
        return col.getAttribute('header');
    }

    sortAsc(col) {
        let accessor = col.getAttribute('accessor');
        this.data = this.data.sort((a, b) => {
            if (typeof a[accessor] === 'string') {

                if (a[accessor].toLowerCase() < b[accessor].toLowerCase()) {
                    return -1;
                }
                if (b[accessor].toLowerCase() < a[accessor].toLowerCase()) {
                    return 1;
                }
                return 0;
            } else {

                if (a[accessor] < b[accessor]) {
                    return -1;
                }
                if (b[accessor] < a[accessor]) {
                    return 1;
                }
                return 0;
            }
        })

        this.pagify();
    }

    sortDesc(col) {
        let accessor = col.getAttribute('accessor');
        this.data = this.data.sort((a, b) => {
            if (typeof a[accessor] === 'string') {

                if (a[accessor].toLowerCase() > b[accessor].toLowerCase()) {
                    return -1;
                }
                if (b[accessor].toLowerCase() > a[accessor].toLowerCase()) {
                    return 1;
                }
                return 0;
            } else {

                if (a[accessor] > b[accessor]) {
                    return -1;
                }
                if (b[accessor] > a[accessor]) {
                    return 1;
                }
                return 0;
            }
        })

        this.pagify();
    }

    getColumnWidth(col: HTMLElement): number {
        return 100 / this.columns.length;
    }

    getModel(col, item) {
        let accessor = col.getAttribute('accessor');
        var model = item[accessor];

        return model;
    }

    getValue(item) {
        return item.role;
    }

    getColumnValue(col: HTMLElement, item: any): string {
        let accessors = col.getAttribute('accessor').split('.');
        let value = item;

        if (!value) {
            return '';
        }

        for (var i = 0; i < accessors.length; i++) {

            value = value[accessors[i]];
        }

        return value;
    }

    getType(col): string {
        return col.getAttribute('type');
    }

    getPlaceholder(col) {
        return col.getAttribute('placeholder');
    }

    getItems(colIndex: number) {
        return this.columnComponents.toArray()[colIndex].getItems();
    }

    editRecord(index: number) {
        this.editIndex = index;
    }

    isEditMode(i, col): boolean {
        return col.getAttribute('editable') === 'true' && this.editIndex === i;
    }

    getTableHeight(): number {
        return this.data ? (this.currentSlice.length * 40) + 40 : 45;
    }

    onDone(recordIndex) {
        // console.log(this.data[recordIndex])
        this.saveRecord.emit(this.data[recordIndex + this.currentStart]);
        this.editIndex = null;
    }

    onDelete(recordIndex) {
        this.deleteRecord.emit(this.data[recordIndex + this.currentStart]);
        this.data.splice(recordIndex + this.currentStart, 1);
        this.pagify();
        this.editIndex = null;
    }

    getPageText() {
        var pageEnd: number = (this.currentStart + this.pageSize * 1);
        var sliceEnd = pageEnd < this.data.length ? pageEnd : this.data.length;
        return (this.currentStart + 1) + ' - ' + sliceEnd + ' of ' + this.data.length;
    }

    canGoNext(): boolean {
        var pageEnd: number = (this.currentStart + this.pageSize * 1);
        return pageEnd < this.data.length;
    }

    canGoPrevious(): boolean {
        return this.currentStart >= this.pageSize;
    }

    goNext() {
        if (this.canGoNext()) {
            this.currentStart = this.currentStart + this.pageSize * 1;
            var pageEnd = (this.currentStart + this.pageSize * 1);
            var sliceEnd = pageEnd < this.data.length ? pageEnd : this.data.length;

            this.currentSlice = this.data.slice(this.currentStart, sliceEnd);
        }
    }

    goPrevious() {
        if (this.canGoPrevious()) {
            this.currentStart = this.currentStart - this.pageSize * 1;
            var pageEnd = (this.currentStart + this.pageSize * 1);
            var sliceEnd = pageEnd < this.pageSize ? this.pageSize : pageEnd;

            this.currentSlice = this.data.slice(this.currentStart, sliceEnd);
        }
    }
}