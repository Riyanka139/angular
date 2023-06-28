import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{name:"test", type:"server", content:"gfyg"}];
 
  onAddServer({serverName, serverContent}) {
    this.serverElements.push({
      type: 'server',
      name: serverName,
      content: serverContent
    });
  }
  onChangeFirst(){
    this.serverElements[0].name = "Changed!"
  }

  destory(){
    this.serverElements.splice(0,1)
  }
}
