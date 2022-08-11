import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Global()
@Module({})
export class DatabaseModule {
  private readonly mongoConnectionURL: string;
  constructor(private configService: ConfigService) {
    this.mongoConnectionURL = configService.get('MONGODB_CONNECTION_LINK');
  }

  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule.forRoot({ isGlobal: false })],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const options: MongooseModuleOptions = {
              uri: configService.get('MONGODB_CONNECTION_LINK'),
              useNewUrlParser: true,
              useUnifiedTopology: true,
            };
            return options;
          },
        }),
      ],
    };
  }
}
