import { TemplateRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export class Constants {
  public static DATA_URL: string = 'assets/data/wikipedia_marvel_data.json';
}

export const DIALOG_CONFIG: MatDialogConfig = {
  maxWidth: '60vw',
  maxHeight: '60vh',
  height: '60vh',
  width: '60vw',
};

export enum DialogType {
  DANGER = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
  PRIMARY_DEFAULT = 'default',
}

export enum DialogButtonStyleType {
  SECONDARY = 'secondary',
  PRIMARY = 'primary',
  ACCENT = 'accent',
}

export interface DialogButton {
  id: string;
  text: string;
  styleType: DialogButtonStyleType;
  isDisabled?: () => boolean;
  onClick?: () => void;
}

export interface DialogData {
  type?: DialogType;
  icon?: string;
  id?: string;
  template: TemplateRef<any>;
  containedText: string;
  buttonConfig?: {
    buttonList: DialogButton[];
    containerStyle?: {
      justifyContent: 'flex-end' | 'flex-start';
    };
  };
}

export enum CharType {
  PIE = 'pie',
  BARS = 'bars',
}

export interface CharConfig {
  margin: number;
  width: number;
  height: number;
}
