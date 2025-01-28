import { DOCUMENT } from '@angular/common';
import { Component, AfterViewInit, ViewChild, 
  ElementRef, Renderer2, NgZone, 
  Input, 
  inject} from '@angular/core';

@Component({
  selector: 'app-ad-component',
  standalone: true,
  templateUrl: './ad-component.component.html',
  styleUrls: ['./ad-component.component.css']
})
export class AdComponent implements AfterViewInit {
  @ViewChild('adContainer', { static: true }) adContainer!: ElementRef;
  @Input() adClient!: string;
  @Input() adSlot!: string;
  @Input() adFormat: string = 'auto';
  @Input() adLayout: string = '';
  document = inject(DOCUMENT);

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.loadAds();
    });
  }

  loadAds() {
    const adScript = this.renderer.createElement('script');
    adScript.async = true;
    adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + this.adClient;
    adScript.crossOrigin = 'anonymous';

    const insElement = this.renderer.createElement('ins');
    this.renderer.setAttribute(insElement, 'class', 'adsbygoogle');
    this.renderer.setStyle(insElement, 'display', 'block');
    this.renderer.setAttribute(insElement, 'data-ad-client', this.adClient);
    this.renderer.setAttribute(insElement, 'data-ad-slot', this.adSlot);
    this.renderer.setAttribute(insElement, 'data-ad-format', this.adFormat);
    this.renderer.setAttribute(insElement, 'data-ad-layout', this.adLayout);
    this.renderer.setAttribute(insElement, 'data-full-width-responsive', 'true');

    const pushScript = this.renderer.createElement('script');
    const text = this.renderer.createText('(adsbygoogle = window.adsbygoogle || []).push({});');
    this.renderer.appendChild(pushScript, text);

    if (!this.document.querySelector('script[src*="adsbygoogle.js"]')) {
      this.renderer.appendChild(this.adContainer.nativeElement, adScript);
    } else console.log('script already present');
    this.renderer.appendChild(this.adContainer.nativeElement, insElement);
    this.renderer.appendChild(this.adContainer.nativeElement, pushScript);
  }
}
