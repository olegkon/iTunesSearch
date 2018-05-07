import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ITunesDataRow } from './iTunesDataRow';


export const ITUNES_URL = new InjectionToken('iTunesUrl');

export interface ITunesSearchResult {   // optional
  iTunesData: Array<ITunesDataRow>;
}


@Injectable()
export class ITunesSearchService {
  constructor(
      private http: HttpClient,
      @Inject(ITUNES_URL) private iTunesUrl: string) {
  }


  getMusic(term: string): Observable<ITunesDataRow[]> {
    console.log('url: ' + this.iTunesUrl + term);
    return this.http
      .get(this.iTunesUrl + term)
      .filter(this._hasResult)
      .map(this._parseData);
  }


  private _hasResult(data): boolean {
    return data['cod'] !== '404' && data.results[0];  // was data.list[0]
  }


  private _parseData(data): ITunesDataRow[] {  // ITunesSearchResult {

    const iTunesData: ITunesDataRow[] = new Array<ITunesDataRow>();

    const len = data.results.length;
    let row;
    for (let i = 0; len > i; i++) {  // position, name, collectionName, trackName, album_pic_url, trackViewUrl
      row = new ITunesDataRow(i+1, data.results[i].artistName, data.results[i].collectionName, data.results[i].trackName,
        data.results[i].artworkUrl100, data.results[i].trackViewUrl);
      iTunesData.push(row);
    }
    // console.log('returning iTunesData[' + len + ']: ' + JSON.stringify(iTunesData)) ;
    return  iTunesData ;
  }

}
