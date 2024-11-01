import { AuthModule } from '@/auth/auth.module';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { UsersModule } from '@/modules/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
      // autoSchemaFile: true
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    /* {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, */
    /* {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }, */
  ],
})
export class AppModule {}
