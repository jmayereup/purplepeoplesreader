import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFilesComponent } from '../form-files/form-files.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PocketbaseService } from '../pocketbase.service';
import { LessonsRecord, LessonsResponse } from '../shared/pocketbase-types';
import { AuthService } from '../auth.service';
import { TAG_VALUES } from '../shared/utils';

@Component({
  selector: 'app-form-lesson',
  standalone: true,
  imports: [CommonModule, FormFilesComponent, ReactiveFormsModule, FormFilesComponent],
  templateUrl: './form-lesson.component.html',
  styleUrl: './form-lesson.component.css'
})
export class FormLessonComponent implements OnInit, OnChanges {

@Input() itemDetails: LessonsResponse | null = null; 

db = inject(PocketbaseService);
auth = inject(AuthService);
fb = inject(FormBuilder);

tags = TAG_VALUES;

lessonForm = this.fb.group({
  id: this.fb.control(''),
  title: this.fb.control(''),
  content: this.fb.control('', Validators.required),
  vocabulary: this.fb.control(''),
  language: this.fb.control('', Validators.required),
  tags: this.fb.control(['']),
  shareable: this.fb.control(false),
  imageUrl: this.fb.control(''),
  creatorId: this.fb.control('')

})

ngOnInit() {
  console.log('on Init called');
  this.loadLesson();
}

ngOnChanges() {
  console.log('on Changes called');
  this.loadLesson();
}

loadLesson() {
  const lesson = this.itemDetails;
  this.lessonForm.patchValue({
    id: lesson?.id,
    title: lesson?.title,
    content: lesson?.content,
    vocabulary: lesson?.vocabulary,
    tags: lesson?.tags,
    shareable: lesson?.shareable,
    imageUrl: lesson?.imageUrl,
    creatorId: lesson?.creatorId
  })
}

setFilePath(val:string) {  
  this.lessonForm.patchValue({
    imageUrl: val
  })
  console.log('imageURL:', val);
}

onSubmit() {
  const creatorID = this.auth.authStore.model?.['id'] || "none";
  const lesson = {
    title: this.lessonForm.value.title,
    content: this.lessonForm.value.content,
    vocabulary: this.lessonForm.value.vocabulary,
    language: this.lessonForm.value.language,
    tags: this.lessonForm.value.tags,
    shareable: this.lessonForm.value.shareable,
    imageUrl: this.lessonForm.value.imageUrl,
    creatorId: creatorID || this.lessonForm.value.creatorId
  }
  if (this.itemDetails?.id)
  {
    //update lesson
    this.db.updateItem(this.itemDetails.id, lesson as LessonsRecord);
    console.log('update lesson called');
  } else {
    console.log('create lesson called');
    this.db.createItem(lesson as LessonsRecord);
    console.log('lesson form submitted', lesson);
  }

}
 
}
