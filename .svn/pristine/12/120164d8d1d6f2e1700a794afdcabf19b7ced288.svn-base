import { Component, ViewChild, Input } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

/* PageDocument : https://material.angular.io/components/paginator/api#additional_classes*/

@Component({
  selector: 'data-table',
  templateUrl: 'data-table.html'
})
export class DataTableComponent {

  //default page size
  private pageSize: number = 10;
  private dataSource = new MatTableDataSource();
  private columns: any;
  private displayedColumns: any;
  private currentPage: number;
  private totalPage: number;

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;

  //Object
  private dataTable: any;

  @Input('dataTable') set setDataTable(_dataTable){

    if(typeof _dataTable != 'undefined'){

      this.dataTable = _dataTable;
      this.columns = this.dataTable.columns;

      //create display column
      this.displayedColumns = this.columns.map(c => c.columnDef);
      //this.displayedColumns = ["ลำดับที่"].concat(this.columns.map(c => c.columnDef));
      console.log('displayedColumns', this.displayedColumns);
      
      //set datasource
      this.dataSource.data = this.dataTable.data;

      //set page and sort
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //set default page = 10
      this.dataSource.paginator._changePageSize(this.pageSize);

      //create range page 
      setTimeout(()=> {
        this.totalPage = this.dataSource.paginator.getNumberOfPages()+1;
      },100);
  
      this.currentPage = this.dataSource.paginator.pageIndex+1;
    }
  }

  constructor() {}

  ngOnInit() {}
 
  ngAfterViewInit() {}

 // Filter 
  private applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //Select Page Size 5,10,15,20
  private changePageSize(value): void {
    this.dataSource.paginator._changePageSize(this.pageSize);
    this.rangePage();
  }

  // /Advances to the next page if it exists.
  private nextPage(): void {
    this.dataSource.paginator.nextPage();
    this.rangePage();
  }

  //Move back to the previous page if it exists.
  private previousPage(): void {
    this.dataSource.paginator.previousPage();
    this.rangePage();
  }

  //Move to the first page if not already there.
  private firstPage(): void {
    this.dataSource.paginator.firstPage();
    this.rangePage();
  }

  // /Move to the last page if not already there.
  private lastPage(): void {
    this.dataSource.paginator.lastPage();
    this.rangePage();
  }

  //Calculate the number of pages----> return index
  private getNumberOfPages(): number {
    return this.dataSource.paginator.getNumberOfPages();
  }

  // 1-5 of 20
  private getRangeLabel(page: number, pageSize: number, length: number): string{
    if (length == 0 || pageSize == 0) { return `0 of ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${length}`; 
  } 

  private rangePage(){
    this.totalPage = this.dataSource.paginator.getNumberOfPages()+1;
    this.currentPage = this.dataSource.paginator.pageIndex+1;
  }
 
}


/*

Example

html : <data-table [dataTable]="dataTable" scroll-xl></data-table>

dataTable = {
        columns:  [
          { columnDef: 'position', header: 'No.',    cell: (element: Element) => `${element.position}`, sortable: true },
          { columnDef: 'name',     header: 'Name',   cell: (element: Element) => `${element.name}`, sortable: true },
          { columnDef: 'weight',   header: 'Weight', cell: (element: Element) => `${element.weight}`, sortable: false },
          { columnDef: 'symbol',   header: 'Symbol', cell: (element: Element) => `${element.symbol}`, sortable: true}
        ],
        data: [
          {position: 1, name: 'input,test', weight: 1.0079, symbol: 'H'},
          {position: 2, name: 'Helium', weight: 4.0026, symbol: 'JOKE'},
          {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
          {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
          ]
      }

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  joke: string;
  joke2: string;
  joke3: string;
}


*/