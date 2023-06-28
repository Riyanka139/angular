import { Component, Input, inject } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  private accountService: AccountService; // <- must be added
 
  constructor() {
    this.accountService = inject(AccountService);
  }
  onSetTo(status: string) {
    this.accountService.updateStatus({id: this.id, newStatus: status});
    this.accountService.statusUpdated.emit(status);
  }
}
