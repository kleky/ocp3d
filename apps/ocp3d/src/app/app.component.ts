import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { RelayService } from './services/relay.service';

@Component({
  selector: 'ocp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ocp3d';

  url = 'http://localhost:3000/api'

  response = "";

  constructor(private httpClient: HttpClient,
              private relayService: RelayService) {
  }

  click() {
    this.httpClient.get(this.url + '/getData').pipe(
      tap(e => console.log(e))
    ).subscribe(resp =>
      this.response = resp as string
    )
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.addChat(`x:${e.clientX} y:${e.clientY}`);
  }

  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];

  ngOnInit(){

    this.relayService.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.relayService.getUsers().subscribe((users: number) => {
      this.users = users;
    });

  }

  addChat(message: string){
    this.messages.push(message);
    this.relayService.sendChat(message);
    this.message = '';
  }

}
