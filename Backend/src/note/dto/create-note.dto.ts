import { IsString } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
}
