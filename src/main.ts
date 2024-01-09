import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RANKINGMS_PACKAGE_NAME } from './ranking/ranking';
import { INestMicroservice } from '@nestjs/common';

async function bootstrap() {
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3007',
        package: RANKINGMS_PACKAGE_NAME,
        protoPath: join(__dirname, 'ranking/ranking.proto'),
      },
    });

  await app.listen();
}
bootstrap();
