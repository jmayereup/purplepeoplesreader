import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-files',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-files.component.html',
  styleUrl: './form-files.component.css'
})
export class FormFilesComponent {

  @Output() imagePath: EventEmitter<string>  = new EventEmitter<string>();
  @Output() audioPath: EventEmitter<string>  = new EventEmitter<string>();

  http = inject(HttpClient);

  errorMessage: any = null;
  successMessage = "";
  fileName = "";
  loading = false;
  selectedFile: File | undefined = undefined;

  form = new FormGroup({
    file: new FormControl()
  });

  constructor() { }

  onFileSelected(event: any) {
    this.successMessage = "";
    this.errorMessage = null;
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile?.name) {
        // this.fileName = this.selectedFile.name;
        this.onSubmit();
      } else this.fileName = "No File Selected";

    };
  }

  onSubmit() {
    this.loading = true;
    const formData = new FormData();
    const encodedFilename = encodeURIComponent(this.selectedFile!.name.toLowerCase());
    this.fileName = encodedFilename;
    formData.append('file', this.selectedFile!, encodedFilename);

    this.http.post('https://blog.teacherjake.com/upload', formData)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.setFilePath(response.path || '');
          this.selectedFile = undefined;
          this.form.reset();
          this.successMessage = "File Upload Successful";
          this.fileName = "";

        },
        error: (error) => {
          this.loading = false;
          console.error('Error Uploading File', error);
          this.errorMessage = error;

        }
      });
  }
  
  setFilePath(val: string) {
    if (val.endsWith('.mp3')) {
      this.audioPath.emit(val);
      return;
    }
    this.imagePath.emit(val);
  }


}

