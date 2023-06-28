import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
 allowAddServer = false;
 serverStatus = "No Server Created"
 serverName = ''
 serverCreated = false;
 servers = ["test1", "test2", "test3"]

 constructor(){
  setTimeout(() => {this.allowAddServer = true},2000)
 }

 addServer(){
  this.serverCreated = true
  this.servers.push(this.serverName)  
  this.serverStatus = "Server Created! Name is " + this.servers.slice(-1)
  this.serverName = ''
 }

 updateServerName(event:Event){
  this.serverName = (<HTMLInputElement>event.target).value
  
 }
}
