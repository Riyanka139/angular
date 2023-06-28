import {EventEmitter, Injectable} from '@angular/core'
import { LoggingService } from './logging.service';

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  constructor(private logging: LoggingService){}

  statusUpdated = new EventEmitter<string>();

  addAccount(newAccount: { name: string; status: string }) {
    this.accounts.push(newAccount);
    this.logging.logStatusChange(newAccount.status);
  }

  updateStatus(updateInfo: { id: number; newStatus: string }) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
    this.logging.logStatusChange(updateInfo.newStatus);
  }
}
