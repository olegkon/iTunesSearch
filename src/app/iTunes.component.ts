import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatTableDataSource } from '@angular/material';

import { ITunesSearchService, ITUNES_URL, ITunesSearchResult } from './services/iTunesSearch.service';
import { ITunesDataRow } from './services/iTunesDataRow';


@Component({
  selector: 'app-root',
  templateUrl: './iTunes.component.html',
  styleUrls: ['./iTunes.component.css']
})
export class ITunesComponent implements OnInit {

  title = 'iTunes search app (with Observable)';
  private iTunesURL = 'https://itunes.apple.com/search?term=';

  searchInput = new FormControl();
  musicData: string;
  iTunesResult: ITunesSearchResult;


  displayedColumns = ['position', 'name', 'collectionName', 'trackName', 'trackViewUrl'];  // 'album_pic_url',
  dataSource = new MatTableDataSource(DFLT_DATA);
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient, private iTunesService: ITunesSearchService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.searchInput.valueChanges
      .debounceTime(400)
      .switchMap(term => this.iTunesService.getMusic(term))
      .subscribe(
        res => {
          // console.log('result: ' + JSON.stringify(res));
          this.dataSource.data = res; // pass data to the dataSource to display
        },
        err => console.log(`Can't get music. Error code: %s, URL: %s`, err.message, err.url)
      );
  }
}

export interface Element {
  name: string;
  position: number;
  collectionName: string;
  trackName: string;
  album_pic_url:  string;
  trackViewUrl: string;
}

const DFLT_DATA: ITunesDataRow[] = [
  {position: 1, name: '', collectionName:  '', trackName: '', album_pic_url: '', trackViewUrl: ''}
];



