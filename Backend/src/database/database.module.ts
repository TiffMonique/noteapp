import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const uri =
  'mongodb+srv://tmoniquemg:!3mHwFB5aM37B_L@cluster0.lts7iyb.mongodb.net/';
@Module({
  imports: [MongooseModule.forRoot(uri)],
})
export class DatabaseModule {}
