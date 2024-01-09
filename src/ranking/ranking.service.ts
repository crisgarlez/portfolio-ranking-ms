import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RankingRecord } from './ranking-record.entity';
import { Record, Records } from './ranking';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(RankingRecord)
    private historyRecordRepository: Repository<RankingRecord>,
  ) {}

  async register(record: any): Promise<Record> {
    const loser = await this.historyRecordRepository.findOne({
      where: { monsterid: record.defeatedid },
    });

    if (loser) {
      loser.defeats = loser.defeats + 1;
      await this.historyRecordRepository.update(loser.id, loser);
    } else {
      const rankingLoserRecord = new RankingRecord();
      rankingLoserRecord.monsterid = record.defeatedid;
      rankingLoserRecord.monstername = record.defeatedname;
      rankingLoserRecord.defeats = 1;
      rankingLoserRecord.victories = 0;
      await this.historyRecordRepository.save(rankingLoserRecord);
    }

    const winner = await this.historyRecordRepository.findOne({
      where: { monsterid: record.winnerid },
    });

    let resultRecord = null;

    if (winner) {
      winner.victories = winner.victories + 1;
      resultRecord = await this.historyRecordRepository.update(
        winner.id,
        winner,
      );
    } else {
      const rankingRecord = new RankingRecord();
      rankingRecord.monsterid = record.winnerid;
      rankingRecord.monstername = record.winnername;
      rankingRecord.victories = 1;
      rankingRecord.defeats = 0;
      resultRecord = await this.historyRecordRepository.save(rankingRecord);
    }

    // return resultRecord;

    return new Promise<Record>((resolve, reject) => {
      // Resuelve la promesa con el objeto Record
      resolve(resultRecord);
    });
  }

  async getRanking(): Promise<Records> {
    console.log('####getRanking####');

    const rankingRecords: RankingRecord[] =
      await this.historyRecordRepository.find({ order: { victories: 'DESC' } });

    const records: Records = { records: [] };
    records.records = rankingRecords;

    return records;
  }
}
