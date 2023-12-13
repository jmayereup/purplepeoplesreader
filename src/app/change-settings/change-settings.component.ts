import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../services/store.service';
import { ChangeLanguageComponent } from "../change-language/change-language.component";

@Component({
    selector: 'app-change-settings',
    standalone: true,
    templateUrl: './change-settings.component.html',
    styleUrl: './change-settings.component.css',
    imports: [CommonModule, ReactiveFormsModule, ChangeLanguageComponent]
})
export class ChangeSettingsComponent {

  store = inject(StoreService);
  fb = inject(FormBuilder);

  rate: number = 1;
  selectedLanguage: string | null = null;
  theme: string = "default";
  // themeColors = this.db.themeColors;


  form = this.fb.group({
    rate: new FormControl(this.rate),
    selectedLanguage: new FormControl('default'),
    theme: new FormControl(this.theme),
    fsize: new FormControl('large')
  });


  constructor() {

    // this.document.body.style.setProperty('font-size', 'x-large');
    this.form.valueChanges.subscribe((value) => {
      this.store.app.selectedLanguage.set(value.selectedLanguage || null);
      this.store.app.selectedRate.set(value.rate || 1);
      // this.setBackGroundColor(value.theme || 'default');
      this.store.app.fontSize.set(value.fsize || 'large');
    });
  }

  // setBackGroundColor(color: string) {
  //   switch (color) {
  //     case "yellow": {
  //       this.themeColors.set(["lightyellow", "black"]);
  //       break;
  //     }
  //     case "blue": {
  //       this.themeColors.set(["#bbd5ff", "black"]);
  //       break;
  //     }
  //     case "green": {
  //       this.themeColors.set(['#dcf3dc', "black"]);
  //       break;
  //     }
  //     case "white": {
  //       this.themeColors.set(["white", "black"]);
  //       break;
  //     }
  //     case "black": {
  //       this.themeColors.set(["black", "white"]);
  //       break;
  //     }
  //     case "default": {
  //       this.themeColors.set(["wheat", "black"]);
  //       break;
  //     }
  //     default: {
  //       this.themeColors.set(["default", "default"]);
  //       break;
  //     }
  //   }

  }
