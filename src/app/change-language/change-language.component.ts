import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.css'
})
export class ChangeLanguageComponent implements OnInit {

  renderer = inject(Renderer2);
  document = inject(DOCUMENT);


  ngOnInit() {
    let present = this.document.getElementById('gtscript');
    if (!present) {
      let script = this.renderer.createElement('script');
      script.id = "gtscript";
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      this.renderer.appendChild(this.document.body, script);
    }

  }


}
