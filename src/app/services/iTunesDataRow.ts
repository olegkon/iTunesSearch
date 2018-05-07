/**
 * Created by okonovalov on 4/9/2018.
 */

export class ITunesDataRow {
    public position: number;
    public name: string;
    public collectionName: string; // collectionName/album
    public trackName: string;
    public album_pic_url: string; // not used
    public trackViewUrl: string;


    constructor(position, name, collectionName, trackName, album_pic_url, trackViewUrl) {
        this.position = position;
        this.name = name;
        this.collectionName = collectionName;
        this.trackName = trackName;
        this.album_pic_url = album_pic_url;
        this.trackViewUrl = trackViewUrl;
    }

}
