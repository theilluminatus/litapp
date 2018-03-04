import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'story-popover',
  template: `

    <ion-list radio-group [(ngModel)]="settings.font">
      <ion-row>
        <ion-col>
          <button (click)="changeFontSize('smaller')" ion-item detail-none class="popover-text-button popover-text-smaller">A</button>
        </ion-col>
        <ion-col>
          <button (click)="changeFontSize('larger')" ion-item detail-none class="popover-text-button popover-text-larger">A</button>
        </ion-col>
        <ion-col>
          <button (click)="changeLineHeight('smaller')" ion-item detail-none class="popover-text-button popover-text-smaller"><ion-icon name="list"></ion-icon></button>
        </ion-col>
        <ion-col>
          <button (click)="changeLineHeight('larger')" ion-item detail-none class="popover-text-button popover-text-larger"><ion-icon name="list"></ion-icon></button>
        </ion-col>
      </ion-row>
      <ion-row class="popover-row-align">
        <button outline color="dark" (click)="changeAlign('side')" ion-button>Side</button>
        <button outline color="dark" (click)="changeAlign('center')" ion-button>Center</button>
        <button outline color="dark" (click)="changeAlign('justify')" ion-button>Justify</button>
      </ion-row>
      <ion-row class="popover-row-dots">
        <ion-col>
          <button (click)="changeBackground('white')" ion-button="popover-dot" class="popover-dot-white"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('tan')" ion-button="popover-dot" class="popover-dot-tan"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('grey')" ion-button="popover-dot" class="popover-dot-grey"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('black')" ion-button="popover-dot" class="popover-dot-black"></button>
        </ion-col>
      </ion-row>
      <ion-item class="popover-text-sans-serif">
        <ion-label>Sans-serif</ion-label>
        <ion-radio value="sans-serif"></ion-radio>
      </ion-item>
      <ion-item class="popover-text-serif">
        <ion-label>Serif</ion-label>
        <ion-radio value="'Times New Roman', serif"></ion-radio>
      </ion-item>
    </ion-list>

  `,
  styles: [`

    story-popover ion-row,
    story-popover ion-col {
      padding: 0;
    }

    .popover-text-button {
      padding-left: 0;
      text-align: center;
      min-height: 20px;
      line-height: 20px;
    }

    .popover-text-button .item-inner {
      padding-right: 0;
    }

    .popover-text-smaller {
      font-size: 11px;
    }

    .popover-text-larger {
      font-size: 18px;
    }

    popover-row-align {
      text-align: center;
    }

    .popover-align button {
      font-size: 10px;
    }

    .popover-row-dots {
      text-align: center;
    }

    .popover-dot {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin: 10px auto;
      position: relative;
    }

    .popover-dot-white {
      background-color: rgb(255,255,255);
    }

    .popover-dot-tan {
      background-color: rgb(249,241,228);
    }

    .popover-dot-grey {
      background-color: rgb(76,75,80);
    }

    .popover-dot-black {
      background-color: rgb(0,0,0);
    }

    .ios .popover-dot.selected,
    .md .popover-dot.selected,
    .wp .popover-dot.selected {
      border-width: 2px;
      border-color: #327eff;
    }

    .popover-text-sans-serid {
      font-family: sans-serif;
    }

    .popover-text-serif {
      font-family: 'Times New Roman', serif;
    }

    /*
      iOS Popover
    */

    .ios .popover-text-smaller {
      border-right: 1px solid #c8c7cc;
    }

    .ios .popover-row-dots {
      border-bottom: 1px solid #c8c7cc;
    }

    .ios .popover-dot {
      border: 1px solid #c8c7cc;
    }

    .hairlines .popover-text-smaller,
    .hairlines .popover-row-dots,
    .hairlines .popover-dot {
      border-width: 0.55px;
    }

    /*
      Material Design Popover
    */

    .md .popover-text-smaller {
      border-right: 1px solid #dedede;
    }

    .md .popover-row-dots {
      border-bottom: 1px solid #dedede;
    }

    .md .popover-dot {
      border: 1px solid #dedede;
    }

    /*
      Windows Popover
    */

    .wp .popover-dot {
      border: 2px solid #ccc;
    }

  `]
})
export class StoryPopover {
  settings: any;

  colors: any = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(navParams: NavParams, public platform: Platform) {
    this.settings = navParams.get('settings');
  }

  changeBackground(color: any) {
    this.settings.theme = color;
    this.settings.color = this.colors[color].fg;
    this.settings.background = this.colors[color].bg;
  }

  changeFontSize(direction: string) {

    if (this.settings.fontsize < 5) return;
    if (this.settings.fontsize > 30) return;

    if (direction == "larger")
      this.settings.fontsize++;
    else
      this.settings.fontsize--;
    
    this.settings.lineheight = this.settings.fontsize * 1.42857;
  }

  changeLineHeight(direction: string) {

    if (this.settings.lineheight < this.settings.fontsize) return;
    if (this.settings.lineheight > this.settings.fontsize*3) return;

    if (direction == "larger")
      this.settings.lineheight++;
    else
      this.settings.lineheight--;
  }

  changeAlign(dir: string) {
    if (dir == "side") {
      if (this.platform.dir() == "rtl")
        dir = "right";
      else
        dir = "left";
    }
    this.settings.textalign = dir;
  }
}