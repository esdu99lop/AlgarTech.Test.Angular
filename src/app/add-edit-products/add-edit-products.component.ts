import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilitiesService } from '../utilities/utilities.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent {
  
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<AddEditProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilitiesService: UtilitiesService) {
      this.productForm = this.formBuilder.group({
        productName: '',
        price: 0
    })
  }

  productsFormSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productsService.editProduct(this.data.idProduct, this.productForm.value).subscribe({
          next: (val: any) => {
            this.utilitiesService.openSnackBar('Product Updated');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
      else {
        this.productsService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            this.utilitiesService.openSnackBar('Product Added');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    }
  }

}
