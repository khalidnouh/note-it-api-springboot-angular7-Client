import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"]
})
export class FeedbackComponent implements OnInit {
  model: feedbackModel = {
    name: "",
    email: "",
    feedBack: ""
  };
  constructor(private http_client: HttpClient) {}

  ngOnInit() {}
  url: string = "http://localhost:8082/api/feedback";
  onSend(): void {
    //alert(this.model.name);
    this.http_client.post(this.url, this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("An error has occurred while sending feedback");
      }
    );
  }
}

export interface feedbackModel {
  name: string;
  email: string;
  feedBack: string;
}
