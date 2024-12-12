import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'AlgarTech-Test-Angular';

  links = [
    { label: 'Orders Summary', path: '/orders' },
    { label: 'Products Summary', path: '/products' }
  ];

  constructor() { }
}
