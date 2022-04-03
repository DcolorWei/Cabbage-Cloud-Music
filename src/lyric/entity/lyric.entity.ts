export class Lyricitem {
    constructor(time: string, text: string) {
        this.time = time;
        this.text = text;
    }
    time: string;
    text: string;
}
export class Lyric {
    constructor(id: number, songname: string, content: Lyricitem[]) {
        this.id = id;
        this.songname = songname;
        this.content = content;
    }
    id:number;
    songname: string;//歌词对应歌曲名称
    content: Lyricitem[]
}