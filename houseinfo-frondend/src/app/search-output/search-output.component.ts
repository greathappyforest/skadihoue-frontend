import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-search-output',
  templateUrl: './search-output.component.html',
  styleUrls: ['./search-output.component.css']
})
export class SearchOutputComponent implements OnInit {

  searchRes: any;
  subscription: Subscription;
  jsonOutPut:String;

  constructor(private shareData:ShareDataService) { 
    this.subscription  = this.shareData.getSearchRes().subscribe(data => { this.searchRes = data.json(); 
      console.log(this.searchRes)
      this.jsonOutPut= JSON.stringify(this.searchRes);
    });
}

ngOnInit() {
    }
  
    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }


}


