import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  // Add Note: /note/create
  @Post('/create')
  async createNote(@Res() res, @Body() createNoteDTO: CreateNoteDTO) {
    const note = await this.noteService.createNote(createNoteDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Note Successfully Created',
      note,
    });
  }

  // Get Notes /note
  // @Get('/list')
  @Get('/')
  async getNotes(@Res() res) {
    const notes = await this.noteService.getNotes();
    return res.status(HttpStatus.OK).json(notes);
  }

  // GET single note: /note/5c9d46100e2e5c44c444b2d11qssss
  @Get('/:noteID')
  async getNote(@Res() res, @Param('noteID') noteID) {
    const note = await this.noteService.getNote(noteID);
    if (!note) throw new NotFoundException('Note does not exist!');
    return res.status(HttpStatus.OK).json(note);
  }

  // Delete Note: /delete?noteID=5c9d45e705ea4843c8d0e8f7
  @Delete('/delete')
  async deleteNote(@Res() res, @Query('noteID') noteID) {
    const noteDeleted = await this.noteService.deleteNote(noteID);
    if (!noteDeleted) throw new NotFoundException('Note does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Note Deleted Successfully',
      noteDeleted,
    });
  }

  // Update Note: /update?noteID=5c9d45e705ea4843c8d0e8f7
  @Put('/update')
  async updateNote(
    @Res() res,
    @Body() createNoteDTO: CreateNoteDTO,
    @Query('noteID') noteID,
  ) {
    const updatedNote = await this.noteService.updateNote(
      noteID,
      createNoteDTO,
    );
    if (!updatedNote) throw new NotFoundException('Note does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Note Updated Successfully',
      updatedNote,
    });
  }
}
