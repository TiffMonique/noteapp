import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDTO } from './dto/create-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  // Get all notes
  async getNotes(): Promise<Note[]> {
    const notes = this.noteModel.find();
    return notes;
  }

  // Get a single Note
  async getNote(noteID: string): Promise<Note> {
    const note = this.noteModel.findById(noteID);
    return note;
  }

  // Post a single note
  async createNote(createNoteDTO: CreateNoteDTO): Promise<Note> {
    const newNote = new this.noteModel(createNoteDTO);
    return newNote.save();
  }

  // Delete note
  async deleteNote(noteID: string): Promise<any> {
    const deletedNote = this.noteModel.findOneAndDelete({ _id: noteID });
    return deletedNote;
  }

  // Put a single Note
  async updateNote(
    noteID: string,
    createNoteDTO: CreateNoteDTO,
  ): Promise<Note> {
    const updatedNote = this.noteModel.findByIdAndUpdate(
      noteID,
      createNoteDTO,
      { new: true },
    );
    return updatedNote;
  }
}
