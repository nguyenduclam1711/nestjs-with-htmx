import { Module, Global } from '@nestjs/common';
import * as Knex from 'knex';
import { ConfigService } from '@nestjs/config';
import { MODULES } from 'src/constants/modules';

@Global() // This makes it available globally in the app
@Module({
  providers: [
    {
      provide: MODULES.KNEX_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        return Knex({
          client: 'pg',
          connection: {
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            user: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
          },
          pool: { min: 2, max: 10 },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['KNEX_CONNECTION'],
})
export class KnexModule {}
