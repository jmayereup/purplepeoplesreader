import { Component, OnInit, Output, EventEmitter, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFilesComponent } from '../form-files/form-files.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BASE, TAG_VALUES } from '../shared/utils';
import { LoginComponent } from "../login/login.component";
import { AuthService } from '../services/auth.service';
import { LessonsService } from '../services/lessons.service';
import { LessonsRecord, LessonsResponse } from '../shared/pocketbase-types';
import { AuthComponent } from "../auth/auth.component";
import { LessonFullTextComponent } from "../lesson-full-text/lesson-full-text.component";
import { LessonListSimpleComponent } from "../lesson-list-simple/lesson-list-simple.component";

@Component({
  selector: 'app-form-lesson',
  standalone: true,
  templateUrl: './form-lesson.component.html',
  styleUrl: './form-lesson.component.css',
  imports: [CommonModule, FormFilesComponent, ReactiveFormsModule, FormFilesComponent, 
    LoginComponent, AuthComponent, LessonFullTextComponent, LessonListSimpleComponent]
})
export class FormLessonComponent implements OnInit, OnDestroy {

  @Output() newID = new EventEmitter<string>();

  lessonsService = inject(LessonsService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  baseImage = BASE.baseImage;

  lessons = this.lessonsService.lessons;
  lesson = this.lessonsService.lesson;
  tags = TAG_VALUES;
  saved = false;
  private subscription: any;

  lessonForm = this.fb.group({
    id: this.fb.control(''),
    title: this.fb.control(''),
    content: this.fb.control('', Validators.required),
    vocabulary: this.fb.control(''),
    language: this.fb.control('English', Validators.required),
    tags: this.fb.control([''], Validators.required),
    shareable: this.fb.control(true, Validators.required),
    imageUrl: this.fb.control(''),
    audioUrl: this.fb.control(''),
    videoUrl: this.fb.control(''),
    creatorId: this.fb.control('')

  })

  constructor() {
    this.subscription = this.lessonForm.valueChanges.subscribe(val => {
      this.saved = false;
    });

  }

  ngOnInit() {
    console.log('on Init called');
    this.lessonsService.fetchLessons();
    this.lesson.set(null);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadLesson() {
    // const creatorID: string = this.authService.user().userId() || "none";
    const lesson = this.lesson();
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
      videoUrl: lesson?.videoUrl,
      creatorId: lesson?.creatorId
    })
  }

  resetForm() {
    this.lesson.set(null);
    this.loadLesson();
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

  selectLesson(id: string): void {
    this.lessonsService.fetchLessonById(id).then(() => {
      this.loadLesson();
    });
  }

  addLesson(newLesson: Partial<LessonsResponse>) {
    this.lessonsService.createLesson(newLesson as LessonsResponse);
  }

  updateLesson(id: string, updatedLesson: Partial<LessonsResponse>): void {
    this.lessonsService.updateLesson(id, updatedLesson as LessonsResponse);
  }

  removeLesson(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this lesson?');
    if (confirmed) {
      this.lessonsService.deleteLesson(id);
    }
  }

  async onSubmit() {
    const lesson = {
      title: this.lessonForm.value.title,
      content: this.lessonForm.value.content,
      vocabulary: this.lessonForm.value.vocabulary,
      language: this.lessonForm.value.language,
      tags: this.lessonForm.value.tags,
      shareable: this.lessonForm.value.shareable,
      imageUrl: this.lessonForm.value.imageUrl,
      audioUrl: this.lessonForm.value.audioUrl,
      videoUrl: this.lessonForm.value.videoUrl,
      creatorId: this.lessonForm.value.creatorId || this.authService.user().creatorID
    }
    if (this.lesson()?.id) {
      //update lesson
      this.lessonsService.updateLesson(this.lesson()!.id, lesson as LessonsRecord).then((res) => {
        if (res?.id) {
          this.selectLesson(res.id);
          this.saved = true;
        }
      });
    } else {
      //create new lesson
      this.lessonsService.createLesson(lesson as Partial<LessonsResponse>).then((res) =>
      {
        if(res) {
          this.saved = true;
          this.selectLesson(res.id);
        }
      });
    }

  }

}
