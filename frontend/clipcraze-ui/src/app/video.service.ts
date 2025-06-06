import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from './upload-video/UploadVideoResponse';
import {VideoDTO} from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private httpClient = inject(HttpClient);

  uploadVideo(file: File): Observable<UploadVideoResponse> {
    const formData = new FormData()
    formData.append("file", file, file.name)
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/v1/videos", formData)
  }

  uploadThumbnail(file: File, videoId: string): Observable<string> {
    const formData = new FormData()
    formData.append("file", file, file.name)
    formData.append("videoId", videoId)
    return this.httpClient.post("http://localhost:8080/api/v1/videos/thumbnail", formData, {
      responseType: "text"
    })
  }

  getVideoDetails(videoId: string): Observable<VideoDTO> {
    return this.httpClient.get<VideoDTO>(`http://localhost:8080/api/v1/videos/${videoId}`)
  }
}
