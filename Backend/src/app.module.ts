import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './note/note.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
