import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/observable';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParams, 'parms');
    console.log(this.route.snapshot.fragment, 'parms');

    this.route.queryParams.subscribe(
      (qp) => (this.allowEdit = qp['allowEdit'] === '1')
    );
    this.route.fragment.subscribe();

    const id = +this.route.snapshot.params['id'];

    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    // subscribe to router id if parameter is changed
    this.route.params.subscribe((params) =>
      this.serversService.getServer(+params['id'])
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(['../'],{ relativeTo: this.route });
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.allowEdit) {
      return true;
    }

    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
