import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../productmodel';

@Component({
  selector: 'app-view-enlarged',
  templateUrl: './view-enlarged.component.html',
  styleUrls: ['./view-enlarged.component.css']
})
export class ViewEnlargedComponent implements OnInit {

  @Input() public item: ProductModel;

  constructor() { }

  ngOnInit(): void {  
  }

}
