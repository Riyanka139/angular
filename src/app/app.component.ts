import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  active = false;
  private activeSub: Subscription

  constructor(private userService:UserService) {}

  ngOnInit() {
   this.activeSub = this.userService.activeEmitter.subscribe(didActive => {
      this.active = didActive
    })
  }

  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }
}
