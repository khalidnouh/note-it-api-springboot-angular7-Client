import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { Routes, RouterModule } from "@angular/router";
import { NotesComponent } from "./notes/notes.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { APP_BASE_HREF } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { from } from "rxjs";
import { NoteComponent } from './notes/note/note.component';

const appRoutes: Routes = [
  {
    path: "notes",
    component: NotesComponent
  },
  {
    path: "feedback",
    component: FeedbackComponent
  },
  {
    path: "",
    component: NotesComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotesComponent,
    FeedbackComponent,
    NotFoundComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
