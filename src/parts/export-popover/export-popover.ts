import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'export-popover',
  template: `

    <ion-list radio-group>

      <ion-list-header>{{'LISTVIEW_EXPORT' | translate}}</ion-list-header>
        <ion-item>
          <ion-label>{{'LISTVIEW_EXPORT_JSON' | translate}}</ion-label>
          <ion-radio value="json" (click)="save('json')"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>{{'LISTVIEW_EXPORT_MARKDOWN' | translate}}</ion-label>
          <ion-radio value="markdown" (click)="save('markdown')"></ion-radio>
        </ion-item>

    </ion-list>
  `
})
export class ExportPopover {

  constructor(private viewCtrl: ViewController) {}

  save(choice: string) {
    this.viewCtrl.dismiss(choice);
  }

}
