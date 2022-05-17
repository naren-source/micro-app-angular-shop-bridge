import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../productmodel';
import { ProductService } from '../products.service';
 
@Component({
  selector: 'app-add-or-update-products',
  templateUrl: './add-or-update-products.component.html',
  styleUrls: ['./add-or-update-products.component.css']
})
export class AddOrUpdateProductsComponent implements OnInit {

  @Input('item') public productItem!: ProductModel;
  @Output() public closeForm = new EventEmitter<string>();
  
  productForm!: FormGroup;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productDesc: new FormControl(null, [Validators.required, this.formDescValidator.bind(this)]),
      productUrl: new FormControl(null, [Validators.required, this.imageUrlValidator.bind(this)]),
      productCategory: new FormControl('Fiction',Validators.required),
    });
    
    if(this.productItem){
      this.setFormValues(this.productItem);
    }
  }

  setFormValues(productItem: ProductModel){
    this.productForm.setValue({
      productName: productItem.name,
      productPrice: productItem.price,
      productDesc: productItem.desc,
      productUrl: productItem.image,
      productCategory: productItem.cateory
    })
  }

  submitValues(){
    let productId = (this.productItem == null)? Math.random()*1 : this.productItem.id;
    let stockavailable = (this.productItem == null)? true : this.productItem.stockavailable;    
    let updatedProduct = new ProductModel(
      productId,
      this.productForm.value.productName,
      this.productForm.value.productPrice,
      this.productForm.value.productDesc,
      this.productForm.value.productUrl,
      this.productForm.value.productCategory,
      stockavailable
    );
    this.productService.updateProduct(updatedProduct);
    this.closeTheForm();
  }

  closeTheForm(){ 
    if(this.productItem){
      this.closeForm.emit('edit');
    }else{
      this.closeForm.emit('new');
    }
    
  }

  formDescValidator(control: FormControl):{[s:string]: boolean}{
    if(control.value){
      if(control.value.length<20){
        return {'detailedDescError': true};
      }
    }
    return null;
  }

  imageUrlValidator(control: FormControl):{[s:string]: boolean}{
    if(control.value){
      let url = control.value;      
      if(!(url.includes("jpg") && url.includes("https://"))){
        return {'invalidURLFormat': true}
      }
    }
    return null;
  }


}
