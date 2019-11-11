import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { NotesBook, Note } from "../model/notesBook";
import { HttpClient } from "@angular/common/http";
import { feedbackModel } from "../feedback/feedback.component";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private BASE_URL = "http://localhost:8080/noteitservice/apis/";
  private ALL_NOTESBOOK_URL = `${this.BASE_URL}` + "/notebooks/all";
  private SEND_FEEDBACK_URL = `${this.BASE_URL}` + "/feedback";
  private CREATE_NOTEBOOK_URL = `${this.BASE_URL}` + "/notebooks";
  private ALL_NOTES_URL = `${this.BASE_URL}` + "/notes/all";
  private ALL_NOTES_BYID_URL = `${this.BASE_URL}` + "/notes/byId/";
  private CREATE_NOTE_URL = `${this.BASE_URL}` + "/notes";
  private ALL_NOTES_BYNOTEBOOK_URL = `${this.BASE_URL}` + "/notes/byNotebook/";
  private DELETE_NOTEBYID = `${this.BASE_URL}` + "/notes/";
  allNotes: NotesBook[];
  constructor(private http_client: HttpClient) {}

  getAllNotebooks(): Observable<NotesBook[]> {
    return this.http_client.get<NotesBook[]>(this.ALL_NOTESBOOK_URL);
  }

  postFeedBack(feedback: feedbackModel): Observable<any> {
    return this.http_client.post(this.SEND_FEEDBACK_URL, feedback);
  }

  postNewNoteBook(notebook: NotesBook): Observable<NotesBook> {
    return this.http_client.post<NotesBook>(this.CREATE_NOTEBOOK_URL, notebook);
  }

  deleteNoteBook(id: number) {
    return this.http_client.delete<NotesBook>(
      this.CREATE_NOTEBOOK_URL + "/" + id
    );
  }

  getAllNotes(): Observable<Note[]> {
    return this.http_client.get<Note[]>(this.ALL_NOTES_URL);
  }

  getAllNotesByNoteBookId(id: string) {
    return this.http_client.get<Note[]>(this.ALL_NOTES_BYNOTEBOOK_URL + id);
  }
  postNewNote(note: Note) {
    return this.http_client.post<Note>(this.CREATE_NOTE_URL, note);
  }

  deleteNote(id: string) {
    return this.http_client.delete<Note>(this.DELETE_NOTEBYID + id);
  }
}
