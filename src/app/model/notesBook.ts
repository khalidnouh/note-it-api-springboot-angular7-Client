export interface NotesBook {
  id: string;
  name: string;
  nbNotes: number;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  notebookId: string;
  lastModifiedOn: string;
}
