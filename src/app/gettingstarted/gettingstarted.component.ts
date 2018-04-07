import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MenuComponent } from '../core/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './gettingstarted.component.html',
  styleUrls: ['./gettingstarted.component.scss']
})
export class GettingStartedComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
    // this.quoteService.getRandomQuote({ category: 'dev' })
    //   .pipe(finalize(() => { this.isLoading = false; }))
    //   .subscribe((quote: string) => { this.quote = quote; });
  }

  gotoRoute(url: string){
    this.router.navigateByUrl(url);
  }
}
