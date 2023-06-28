import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'my app';
  display = true;
  numbers = [];
  value = 5;

  toggleDisplay() {
    this.display = !this.display;
    // this.numbers.push(this.numbers.length + 1)
    this.numbers.push(new Date());
  }
}
