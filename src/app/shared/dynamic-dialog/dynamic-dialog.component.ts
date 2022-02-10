import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogButtonStyleType, DialogData, DialogType } from '../constants';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicDialogComponent implements OnInit {
  dialogTypeClass: string = '';

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.dialogTypeClass = this.data?.type
      ? this.data.type.valueOf()
      : DialogType.PRIMARY_DEFAULT.valueOf();

    this.setupButtonConfig();
  }

  setupButtonConfig(): void {
    this.data.buttonConfig = this.data.buttonConfig
      ? this.data.buttonConfig
      : {
          buttonList: [
            {
              id: 'acceptButton',
              text: 'accept',
              styleType: DialogButtonStyleType.PRIMARY,
            },
            {
              id: 'cancelButton',
              text: 'cancel',
              styleType: DialogButtonStyleType.SECONDARY,
            },
          ],
        };
  }
}
