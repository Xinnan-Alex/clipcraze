import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private httpClient = inject(HttpClient);

  uploadVideo(file: File): Observable<any> {
    const formData = new FormData()
    formData.append("file", file, file.name)
    return this.httpClient.post("http://localhost:8080/api/v1/videos", formData)
  }
}
