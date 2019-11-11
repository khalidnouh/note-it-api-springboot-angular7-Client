import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotesBook, Note } from "../model/notesBook";
import { from } from "rxjs";
import { ApiService } from "../shared/api.service";
@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit {
  allNotesBook: NotesBook[];
  allNotes: Note[];
  selectedNoteBook: NotesBook;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  getAllNotebooks() {
    this.api.getAllNotebooks().subscribe(
      res => {
        this.allNotesBook = res;
      },
      err => {
        alert("error has occured");
      }
    );
  }

  createNoteBook() {
    let newNoteBook: NotesBook = {
      name: "new note",
      id: null,
      nbNotes: 0
    };
    console.log("aaaa");
    this.api.postNewNoteBook(newNoteBook).subscribe(
      res => {
        alert("success");

        this.allNotesBook.push(res);
      },
      err => {
        alert("an error occured");
      }
    );
  }
  deleteNotebook(notebook) {
    if (confirm("Are you sure want to delete this NoteBook")) {
      this.api.deleteNoteBook(notebook.id).subscribe(
        res => {
          console.log("deleting success");
          this.allNotesBook.splice(this.allNotesBook.indexOf(notebook));
        },
        err => {
          console.log("error occured");
        }
      );
    }
  }

  updateNotebook(notebook) {
    console.log("updating");
    this.api.postNewNoteBook(notebook).subscribe(
      res => {
        alert("Updated Successfully");

        this.allNotesBook.push(res);
      },
      err => {
        alert("an error occured");
      }
    );
  }

  getAllNotes() {
    this.api.getAllNotes().subscribe(
      res => {
        console.log("got it");
        this.allNotes = res;
      },
      err => {
        alert("error has occured");
      }
    );
  }

  createNote() {
    let note_: Note = {
      id: null,
      title: "new note",
      text: "thisis my new note",
      notebookId: this.selectedNoteBook.id,
      lastModifiedOn: null
    };
    return this.api.postNewNote(note_).subscribe(
      res => {
        this.allNotes.push(note_);
      },
      err => {
        alert("error occured");
      }
    );
  }
  setSelectedNoteBook(notebook: NotesBook) {
    if (notebook != null) {
      this.selectedNoteBook = notebook;
      this.api.getAllNotesByNoteBookId(notebook.id).subscribe(
        res => {
          this.allNotes = res;
        },
        err => {
          alert("error occured");
        }
      );
      console.log(notebook.name);
    }
  }

  updateNote(note: Note) {
    this.api.postNewNote(note).subscribe(
      res => {
        console.log("updated");
      },
      err => {
        alert("an error occured");
      }
    );
  }

  selectAllNotes() {
    this.api.getAllNotes().subscribe(res => (this.allNotes = res));
    this.selectedNoteBook = null;
  }

  deleteNote(note: Note) {
    if (confirm("Are you sure want to delete this NoteBook")) {
      this.api.deleteNote(note.id).subscribe(
        res => {
          console.log("deleting success");
          this.allNotes.splice(this.allNotes.indexOf(note));
        },
        err => {
          console.log("error occured");
        }
      );
    }
  }
}
