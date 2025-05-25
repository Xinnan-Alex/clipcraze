import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../video.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-video-details',
  standalone: false,
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.css'
})
export class SaveVideoDetailsComponent {

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags = signal<string[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  selectedFile!: File;
  fileSelected = false;

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('')
  description: FormControl = new FormControl('')
  videoStatus: FormControl = new FormControl('')
  selectedFileName = ""
  videoId = ""
  videoURL = ""

  constructor(private activatedRoute: ActivatedRoute,
              private videoService: VideoService,
              private matSnackbar: MatSnackBar,
  ) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideoDetails(this.videoId).subscribe(
      data => {
        this.videoURL = data.videoURL;
      }
    );
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.update(tag => [...tag, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      return [...tags];
    });
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index] = value;
        return [...tags];
      }
      return tags;
    });
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0]
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId).subscribe(
      data => {
        console.log(data);
        this.matSnackbar.open("Thumbnail uploaded successfully.", "OK")
      }
    );
  }
}
