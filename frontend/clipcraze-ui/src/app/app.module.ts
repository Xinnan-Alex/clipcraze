import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NgxFileDropModule} from 'ngx-file-drop';
import {provideHttpClient} from "@angular/common/http";
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SaveVideoDetailsComponent} from './save-video-details/save-video-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaveVideoDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxFileDropModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
