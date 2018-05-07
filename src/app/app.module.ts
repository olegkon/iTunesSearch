import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { AppComponent } from './weather.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatSortModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ITunesComponent } from './iTunes.component';
import { ITUNES_URL, ITunesSearchService } from './services/iTunesSearch.service';



@NgModule({
  declarations: [
    AppComponent,
    ITunesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,     // for Angular Material Table with sort
    MatSortModule
  ],
  providers: [
    { provide: LocationStrategy,   useClass: HashLocationStrategy },
    { provide: ITUNES_URL,   useValue: 'https://itunes.apple.com/search?term='},  // decided to declare this URL here (at top level)
    ITunesSearchService
  ],
  bootstrap: [ AppComponent, ITunesComponent ]
})

export class AppModule { }
