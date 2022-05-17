import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../productmodel';
import { ProductService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';  

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  public listOfProducts: ProductModel[] = [];
  
  public enableModifyButtons: boolean = false;
  public openEdit: boolean = false;
  public editThisproduct!: ProductModel;
   
  public openNew: boolean = false;

  public entriesPerPage: number = 5;
  public currentPage: number = 1;
  public paginatedList: any = [];
  public entriesInCurrentPage: number = this.paginatedList.length;

  public openEnlargedView: boolean = false;
  public itemToBeEnlarged: ProductModel;
  

  constructor(public dataService: ProductService,
    public route: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.enableModifyButtons = this.activeRoute.snapshot.data['modifyButtons'];

    this.dataService.productsUpdated.subscribe(updatedProducts => {
      this.listOfProducts = updatedProducts;
      this.pagination(this.currentPage);
    })

    this.dataService.getProducts().subscribe(
      (productList) => {
        this.listOfProducts = productList;
        this.pagination(this.currentPage);
      }
    );

  }

  pagination(page: number) {    
    this.paginatedList = [];
    let startValue = (page - 1) * this.entriesPerPage;
    let endValue = page * this.entriesPerPage;
    for (let i = startValue; i < endValue; i++) {
      if(!this.listOfProducts[i]){break;}
      this.paginatedList.push(this.listOfProducts[i]);
    }    
    this.entriesInCurrentPage = this.paginatedList.length;    
  }

  changePage(change: number){
    this.currentPage += change==1? 1 : -1;
    this.pagination(this.currentPage);
  }

  deleteAnItem(productId: number) {
    this.dataService.deleteProducts(productId);
  }

  openForm(editThisproduct: ProductModel | null) {  
    window.scrollTo(0,0);
    this.editThisproduct = editThisproduct;
    if (editThisproduct) {      
      this.openEdit = true;
    } else {
      this.openNew = true;
    }
  }

  closeTheForm(value: string) {
    if(value === 'edit'){
      this.openEdit = false;
    }else if(value === 'new'){
      this.openNew = false;
    }
  }

  enlargeItem(product: ProductModel){
    this.openEnlargedView = !this.enableModifyButtons;
    this.itemToBeEnlarged = product;
  }

  backToViewMode(){    
    this.openEnlargedView = false;
  }


}
