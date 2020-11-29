import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ocp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ocp3d';

  url = 'http://localhost:3333/api'

  response = "";

  constructor(private httpClient: HttpClient) {
  }

  click() {
    this.httpClient.get(this.url + '/getData').pipe(
      tap(e => console.log(e))
    ).subscribe(resp =>
      this.response = resp as string
    )
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {

  }

}
