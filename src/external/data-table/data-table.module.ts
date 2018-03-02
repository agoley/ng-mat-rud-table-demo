import { MatTooltipModule, MatSelectModule, MatButtonModule, MatInputModule } from '@angular/material';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataTableColumnComponent } from './components/data-table-column/data-table-column.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatInputModule, 
        MatSelectModule,        
        MatTooltipModule
    ],
    exports: [
        DataTableColumnComponent,        
        DataTableComponent
    ],
    declarations: [
        DataTableColumnComponent,        
        DataTableComponent
    ],
    bootstrap: [DataTableComponent],
    providers: [],
})
export class DataTableModule { }
