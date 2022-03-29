export class Lyricitem {
    constructor(time: string, text: string) {
        this.time = time;
        this.text = text;
    }
    time: string;
    text: string;
}
export class Lyric {
    constructor(name: string, content: Lyricitem[]) {
        this.name = name;
        this.content = content;
    }
    name: string;//歌词对应歌曲名称
    content: Lyricitem[]
}