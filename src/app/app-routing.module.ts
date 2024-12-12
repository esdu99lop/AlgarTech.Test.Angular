import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersSummaryComponent } from './orders-summary/orders-summary.component';
import { ProductsSummaryComponent } from './products-summary/products-summary.component';

const routes: Routes = [
  {path: 'orders', component: OrdersSummaryComponent},
  {path: 'products', component: ProductsSummaryComponent},
  { path: '', redirectTo: '/orders', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
