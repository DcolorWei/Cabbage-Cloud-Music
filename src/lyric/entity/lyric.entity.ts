export class Lyricitem {
    constructor(time: string, text: string) {
        this.time = time;
        this.text = text;
    }
    time: string;
    text: string;
}
export class Lyric {
    constructor(songname: string, content: Lyricitem[]) {
        this.songname = songname;
        this.content = content;
    }
    songname: string;//歌词对应歌曲名称
    content: Lyricitem[]
}