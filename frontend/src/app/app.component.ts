import { Component } from '@angular/core';
import { Carousel, Dropdown, initTE } from 'tw-elements';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit() {
    initTE({ Carousel, Dropdown });
  }

  title = 'frontend';
}
