import { Component, Input } from '@angular/core';
import { ShareDataService } from "./services/share-data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareDataService]
})
export class AppComponent {
  
  title = 'SkadiHouse';
  
router:any
  constructor(private _router: Router) {
    this.router = _router;
  }
  public href: string = "";
  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }  
}