import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public route: Router, private activeRoute: ActivatedRoute){}

  ngOnInit(){        
  }

  routeTo(destination: string){    
    this.route.navigate([`${destination}`],{relativeTo: this.activeRoute});
  }
}
