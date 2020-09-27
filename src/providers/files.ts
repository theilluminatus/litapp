import { Injectable } from '@angular/core';
import { UX } from './shared/ux';
import { TranslateService } from '@ngx-translate/core';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { handleNoCordovaError } from '../app/utils';

// Used for downloading json files when webapp is used
const downloadTextFile = (text: string, filename: string): void => {
  const url = window.URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

@Injectable()
export class Files {
  translations;

  constructor(
    public ux: UX,
    public file: File,
    public filePath: FilePath,
    public fileOpener: FileOpener,
    public translate: TranslateService,
  ) {
    this.translate.get(['FILE_EXPORT_SUCCESS']).subscribe(values => {
      this.translations = values;
    });
  }

  save(filename: string, content: string, type: string) {
    try {
      const path = this.file.externalRootDirectory;
      const parsedFilename = filename.replace(/[\\\\/:*?"<>|]/gm, '_'); // remove invalid filename chars
      const filePath = `${path}${parsedFilename}`;

      this.file
        .writeFile(path, parsedFilename, content, { replace: true })
        .then(() => {
          this.ux.showToast('INFO', `${this.translations.FILE_EXPORT_SUCCESS}: ${filePath}`, undefined, 'FILE_VIEW').then(() => {
            this.fileOpener.open(filePath, 'application/json');
          });
        })
        .catch(err => handleNoCordovaError(err, e => downloadTextFile(content, parsedFilename)));
    } catch (error) {
      this.ux.showToast('ERROR', 'FILE_EXPORT_FAIL');
      console.error('files.save', [content], error);
    }
  }
}
