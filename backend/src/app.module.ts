import { AuthModule } from '@/auth/auth.module';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { TransformInterceptor } from '@/lib/transform.interceptor';
import { UsersModule } from '@/modules/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
      // autoSchemaFile: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI'),
        synchronize: true,
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      }),
      inject: [ConfigService], 
    }),
    /* ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService], 
    }), */
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    /* {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }, */
  ],
})
export class AppModule {}
