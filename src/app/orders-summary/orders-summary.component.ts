import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from '../services/orders.service';
import { UtilitiesService } from '../utilities/utilities.service';
import { AddEditOrdersComponent } from '../add-edit-orders/add-edit-orders.component';

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss']
})
export class OrdersSummaryComponent implements OnInit {
  
    dataSource!: MatTableDataSource<any>;
    displayedColumns: string[] = ['clientIdentification', 'clientAddress', 'orderDate', 'total', 'actions'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
      private dialog: MatDialog,
      private ordersService: OrdersService,
      private utilitiesService: UtilitiesService
    ) {}

    ngOnInit(): void{
      this.getOrdersList();
    }

    openAddEditOrdersForm() {
      const dialogRef = this.dialog.open(AddEditOrdersComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getOrdersList();
          }
        }
      });
    }

    getOrdersList() {
      this.ordersService.getOrdersList().subscribe({
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

    deleteOrder(id: number) {
      this.ordersService.deleteOrder(id).subscribe({
        next: (res) => {
          this.utilitiesService.openSnackBar('Order Deleted')
          this.getOrdersList();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
}
