import { Component, OnInit } from '@angular/core';
import { Iproduct } from './models/product';
import { ProductsService } from './services/products.service';
import { Observable }  from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Shop';
  products$: Observable<Iproduct[]>
  loading = false
  tern = ''

constructor(private productsService: ProductsService){
}

  ngOnInit(): void {
    this.loading = true
    this.products$ = this.productsService.getAll()
  }



}
