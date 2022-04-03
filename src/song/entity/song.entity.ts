import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('songinfo')
export class SongInfo {
    @PrimaryGeneratedColumn()
    id:number;
    @Column('varchar',{nullable:true})
    digest: string;
    @Column('varchar',{nullable:true})
    name: string;
    @Column('varchar',{nullable:true})
    author: string;
    @Column('varchar',{nullable:true})
    album: string;
    @Column('varchar',{nullable:true})
    songfilepath: string;
}