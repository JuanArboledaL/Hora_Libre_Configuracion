import { NgFor,NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { products } from '../products';


@Component({
  selector: 'app-product-list',
  imports: [NgFor,NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  products  =[...products];
  
  share() {
    window.alert('The product has been shared!');
  }
}
