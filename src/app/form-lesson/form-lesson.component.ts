import { Component, Input, OnChanges, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFilesComponent } from '../form-files/form-files.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PocketbaseService } from '../services/pocketbase.service';
import { LessonsRecord, LessonsResponse } from '../shared/pocketbase-types';
import { AuthService } from '../services/auth.service';
import { addLineBreaksWithTranslatedDivs } from '../../app/shared/utils';
import { TAG_VALUES } from '../shared/utils';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-form-lesson',
  standalone: true,
  imports: [CommonModule, FormFilesComponent, ReactiveFormsModule, FormFilesComponent],
  templateUrl: './form-lesson.component.html',
  styleUrl: './form-lesson.component.css'
})
export class FormLessonComponent implements OnInit, OnChanges {

@Input() itemDetails: LessonsResponse | null = null;
@Output() newID = new EventEmitter<string>();

store = inject(StoreService);
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
  const creatorID: string = this.store.user.userId() || '';
  const lesson = this.itemDetails;
  this.lessonForm.patchValue({
    id: lesson?.id,
    title: lesson?.title,
    content: lesson?.content,
    vocabulary: lesson?.vocabulary,
    tags: lesson?.tags,
    shareable: lesson?.shareable,
    imageUrl: lesson?.imageUrl,
    creatorId: creatorID
  })
}

setFilePath(val:string) {  
  this.lessonForm.patchValue({
    imageUrl: val
  })
  console.log('imageURL:', val);
}

async onSubmit() {
  const originalText = this.lessonForm.value.content || "none";
  const wrappedText = addLineBreaksWithTranslatedDivs(originalText);
  const lesson = {
    title: this.lessonForm.value.title,
    content: this.lessonForm.value.content,
    contentLines: wrappedText,
    vocabulary: this.lessonForm.value.vocabulary,
    language: this.lessonForm.value.language,
    tags: this.lessonForm.value.tags,
    shareable: this.lessonForm.value.shareable,
    imageUrl: this.lessonForm.value.imageUrl,
    creatorId: this.lessonForm.value.creatorId
  }
  if (this.itemDetails?.id)
  {
    //update lesson
    this.store.lessons.update(this.itemDetails.id, lesson as LessonsRecord).then(data => {
      console.log('updated lesson');
      this.store.lessons.fetchDetails(this.itemDetails?.id || "");
    });
    //create new lesson
  } else {
    console.log('create lesson called');
    await this.store.lessons.create(lesson as LessonsRecord).then(data => {
      console.log('lesson created', data);
      this.store.lessons.fetchDetails(data.id).then(id => {
        this.newID.emit(id);
      });

    });
  }
  
}
 
}
