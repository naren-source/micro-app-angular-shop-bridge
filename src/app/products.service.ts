import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Subject, tap, throwError } from "rxjs";
import { ProductModel } from "./productmodel";

@Injectable({ providedIn: 'root' })
export class ProductService {

    public baseApiUrl: string = 'https://shopbridge-mockapi-default-rtdb.firebaseio.com';
    public productList: ProductModel[] = [];
    public productsUpdated = new Subject<ProductModel[]>();    

    constructor(public http: HttpClient) { }


    storeProduct(product: ProductModel) {
        this.productList.push(product);
        this.storeProducts();
    }

    storeProducts() {
        this.http.put<ProductModel[]>(
            `${this.baseApiUrl}/products-store.json`,
            this.productList
        )
        .pipe(
            catchError(error=>{
                return throwError(error);
            })
        )
        .subscribe(data => {
            this.getProducts().subscribe(updatedProducts => {
                this.productsUpdated.next(this.productList);
            });
        });
    }

    getProducts() {
        return this.http.get<ProductModel[]>(`${this.baseApiUrl}/products-store.json`)
            .pipe(
                map((productList: ProductModel[]) => {
                    this.productList = [];
                    if(productList){
                        for (let i of productList) {
                            if (i) {
                                this.productList.push(i);
                            }
                        }                    
                    }                                        
                    return this.productList;
                }),   
                catchError(error=>{
                    return throwError(error);
                })             
            );
    }

    deleteProducts(productId: number) {  
        let index = this.findIndex(productId);      
        this.productList.splice(index, 1);        
        this.storeProducts();        
    }

    updateProduct(product: ProductModel){
        let index = this.findIndex(product.id);  
        this.http.patch<ProductModel>(
            `https://shopbridge-mockapi-default-rtdb.firebaseio.com/products-store/${index}.json`,
            product
        )
        .pipe(
            catchError(error=>{
                return throwError(error);
            })
        )
        .subscribe(data=>{
            this.getProducts().subscribe(updatedProducts => {
                this.productsUpdated.next(this.productList);
            });       
        })
    }

    findIndex(productId: number){
        let index = 0;
        for (let item of this.productList) {
            if (item.id === productId) {
                break;
            }
            index++;
        }
        return index;        
    }

}