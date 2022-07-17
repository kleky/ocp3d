import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {  } };


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
