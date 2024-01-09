import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  Empty,
  RankingServiceController,
  RankingServiceControllerMethods,
  Record,
  Records,
  Result,
} from './ranking';
import { Observable } from 'rxjs';
import { RankingService } from './ranking.service';

@Controller()
@RankingServiceControllerMethods()
export class RankingController implements RankingServiceController {
  @Inject(RankingService)
  private readonly service: RankingService;

  findAllRecords(
    request: Empty,
  ): Records | Observable<Records> | Promise<Records> {
    console.log('####findAllRecords####');

    return this.service.getRanking();
  }

  async sendResult(request: Result): Promise<Record> {
    console.log('####sendResult####');
    console.log('####request: ' + JSON.stringify(request));

    return this.service.register(request);
  }
}
