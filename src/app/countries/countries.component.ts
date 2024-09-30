import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { CountriesStore } from './store/countries.store';

@Component({
  selector: 'app-countries',
  standalone: true,
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
  imports: [AgGridAngular],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  readonly countriesStore = inject(CountriesStore);

  GRID = {
    gridApi: <GridApi>{},
    defaultColDef: <ColDef>{
      flex: 1,
      filter: true,
    },
    columnDefs: <ColDef[]>[
      { field: "id" },
      { field: "name" },
      { field: "population" },
      { field: "land_area" },
      { field: "density" },
      { field: "capital" },
      { field: "currency" },
      { field: "flag" },
    ],
  };

  onGridReady(params: GridReadyEvent) {
    this.GRID.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.GRID.gridApi.setGridOption("quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }
}
