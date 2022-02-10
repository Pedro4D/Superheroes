import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
  constructor() {}
  @Input() list: any[] = [];
  @Input() title!: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('inputValue') inputValue!: ElementRef<HTMLInputElement>;
  @Input()
  set filterValues(filterValues: any[]) {
    this.values = filterValues;
    this.refreshValues();
  }
  get filterValues(): any[] {
    return this.values;
  }
  values!: any[];
  listValues: any[] = [];
  valueCtrl = new FormControl();
  filteredValues!: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  removable: boolean = true;
  selectable: boolean = true;

  ngOnInit(): void {}

  selected(event: MatAutocompleteSelectedEvent) {
    if (this.list.indexOf(event.option.viewValue) < 0) {
      this.list.push(event.option.viewValue);
      this.inputValue.nativeElement.value = '';
      this.listValues.push(event.option.value);
      this.onChange.emit(this.listValues);
    }
    this.refreshValues();
  }

  private refreshValues() {
    this.filteredValues = this.valueCtrl.valueChanges.pipe(
      startWith(''),
      map((value: string) => (value ? this.filter(value) : this.values.slice()))
    );
  }

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.values.filter((val: any) =>
      val.toLowerCase().includes(filterValue)
    );
  }

  removeChip(chip: any) {
    const index = this.list.indexOf(chip);
    if (index >= 0) {
      this.list.splice(index, 1);
      this.listValues.splice(index, 1);
      this.onChange.emit(this.listValues);
    }
    this.refreshValues();
  }
}
