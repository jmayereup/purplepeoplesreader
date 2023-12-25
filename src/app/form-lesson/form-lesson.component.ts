import { Component, OnChanges, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFilesComponent } from '../form-files/form-files.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonsRecord } from '../shared/pocketbase-types';
import { addLineBreaksWithTranslatedDivs } from '../../app/shared/utils';
import { TAG_VALUES } from '../shared/utils';
import { StoreService } from '../services/store.service';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-form-lesson',
  standalone: true,
  templateUrl: './form-lesson.component.html',
  styleUrl: './form-lesson.component.css',
  imports: [CommonModule, FormFilesComponent, ReactiveFormsModule, FormFilesComponent, LoginComponent]
})
export class FormLessonComponent implements OnInit, OnChanges {

  @Output() newID = new EventEmitter<string>();

  store = inject(StoreService);
  fb = inject(FormBuilder);

  itemDetails = this.store.lessons.details;
  tags = TAG_VALUES;
  creatorID: string = this.store.user.userId();
  userIsValid = this.store.user.isValid;

  lessonForm = this.fb.group({
    id: this.fb.control(''),
    title: this.fb.control(''),
    content: this.fb.control('', Validators.required),
    vocabulary: this.fb.control(''),
    language: this.fb.control('', Validators.required),
    tags: this.fb.control([''], Validators.required),
    shareable: this.fb.control(true, Validators.required),
    imageUrl: this.fb.control(''),
    audioUrl: this.fb.control(''),
    creatorId: this.fb.control(this.creatorID)

  })

  ngOnInit() {
    console.log('on Init called');
    this.store.user.getUser();
    this.loadLesson();
  }

  ngOnChanges() {
    console.log('on Changes called');
    this.loadLesson();
  }

  loadLesson() {
    const creatorID: string = this.store.user.userId();
    const lesson = this.itemDetails();
    this.lessonForm.patchValue({
      id: lesson?.id,
      title: lesson?.title,
      content: lesson?.content,
      vocabulary: lesson?.vocabulary,
      tags: lesson?.tags || ['A2'],
      language: lesson?.language || 'English',
      shareable: lesson?.shareable || true,
      imageUrl: lesson?.imageUrl,
      audioUrl: lesson?.audioUrl,
      creatorId: creatorID
    })
  }

  setImagePath(val: string) {
    this.lessonForm.patchValue({
      imageUrl: val
    })
    console.log('imageURL:', val);
  }

  setAudioPath(val: string) {
    this.lessonForm.patchValue({
      audioUrl: val
    })
    console.log('audoURL:', val);
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
      audioUrl: this.lessonForm.value.audioUrl,
      creatorId: this.lessonForm.value.creatorId || this.creatorID
    }
    if (this.itemDetails()?.id) {
      //update lesson
      this.store.lessons.update(this.itemDetails()!.id, lesson as LessonsRecord).then(data => {
        console.log('updated lesson');
        this.store.lessons.fetchDetails(this.itemDetails()!.id || "");
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
