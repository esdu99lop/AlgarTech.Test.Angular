import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditProductsComponent } from '../add-edit-products/add-edit-products.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { UtilitiesService } from '../utilities/utilities.service';

@Component({
  selector: 'app-products-summary',
  templateUrl: './products-summary.component.html',
  styleUrls: ['./products-summary.component.scss']
})
export class ProductsSummaryComponent {
  
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['productName', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private utilitiesService: UtilitiesService) { }
  
  ngOnInit(): void {
    this.getProductList();
  }

  openAddEditProductsForm() {
    const dialogRef = this.dialog.open(AddEditProductsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    });
  }

  getProductList() {
    this.productsService.getProductsList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    console.log(id);
    this.productsService.deleteProduct(id).subscribe({
      next: (res) => {
        this.utilitiesService.openSnackBar('Product Deleted')
        this.getProductList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editProduct(data: any) {
    const dialogRef = this.dialog.open(AddEditProductsComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      }
    });
  }
}
