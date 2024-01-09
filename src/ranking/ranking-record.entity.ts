import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ranking_records')
export class RankingRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  monsterid: string;

  @Column({ nullable: false })
  monstername: string;

  @Column({ nullable: false })
  victories: number;

  @Column({ nullable: true })
  defeats: number;
}
