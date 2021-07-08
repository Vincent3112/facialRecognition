import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  constructor( readonly router: Router) { }

  public goToVipList(): void {
    this.router.navigate(['/vips']);
  }

  public goToWelcomePage(): void {
    this.router.navigate(['/']);
  }
  
}
