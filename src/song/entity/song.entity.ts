import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('songinfo')
export class SongInfo {
    @PrimaryGeneratedColumn()
    num:number;
    @Column('varchar',{nullable:true})
    id: string;
    @Column('varchar',{nullable:true})
    name: string;
    @Column('varchar',{nullable:true})
    author: string;
    @Column('varchar',{nullable:true})
    album: string;
    @Column('varchar',{nullable:true})
    songfilepath: string;
}