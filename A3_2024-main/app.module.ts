import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
