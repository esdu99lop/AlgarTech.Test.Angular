import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../services/orders.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilitiesService } from '../utilities/utilities.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-edit-orders',
  templateUrl: './add-edit-orders.component.html',
  styleUrls: ['./add-edit-orders.component.scss']
})
export class AddEditOrdersComponent implements OnInit {

  ordersForm!: FormGroup
  productsList: any[] = []
  total: number = 0;
  selectedProducts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<AddEditOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilitiesService: UtilitiesService){
    }

    ngOnInit(): void {
      this.ordersForm = this.formBuilder.group({
        clientIdentification: ['', Validators.required],
        clientAddress: ['', Validators.required],
        total: [0, Validators.required],
        products: this.formBuilder.array([])
      });

      this.productsService.getProductsList().subscribe(products =>{
        this.productsList = products;
      });
    }

    get products() {
      return (this.ordersForm.get('products') as FormArray);
    }

    addProductToForm(product: any): void {
      const productFormGroup = this.formBuilder.group({
        idProduct: [product.idProduct, Validators.required],
        productName: [product.productName, Validators.required],
        price: [product.price, Validators.required]
      });
  
      this.products.push(productFormGroup);
      this.selectedProducts.push({productName: productFormGroup.value.productName, price: productFormGroup.value
        .price
      });
      this.updateTotal();
    }
  
    orderFormSubmit() {
      if (this.ordersForm.valid) {
          this.ordersService.addOrder(this.ordersForm.value).subscribe({
            next: (val: any) => {
              this.utilitiesService.openSnackBar('Order Added');
              this.dialogRef.close(true);
            },
            error: (error: any) => {
              console.error(error);
            }
        });
      }
    }

    updateTotal() {
      this.total = this.selectedProducts.reduce((sum, product) => sum + product.price, 0);
      this.ordersForm.get('total')?.setValue(this.total);
    }

    removeProduct(index: number) {
      this.selectedProducts.splice(index, 1);
      this.products.removeAt(index);
      this.updateTotal();
    }
}