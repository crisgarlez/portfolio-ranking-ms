import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingRecord } from './ranking-record.entity';
import { RankingService } from './ranking.service';

@Module({
  imports: [TypeOrmModule.forFeature([RankingRecord])],
  providers: [RankingService],
  controllers: [RankingController],
})
export class RankingModule {}
