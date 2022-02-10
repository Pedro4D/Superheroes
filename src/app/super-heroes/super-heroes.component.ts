import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SuperHeroesService } from '../shared/super-heroes.service';
import { SuperHero } from './shared/super-hero.model';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import {
  CharConfig,
  DialogButtonStyleType,
  DialogType,
  DIALOG_CONFIG,
} from '../shared/constants';
import { DynamicDialogComponent } from '../shared/dynamic-dialog/dynamic-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.scss'],
})
export class SuperHeroesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('viewHeroDialog', { static: true })
  viewHeroDialog!: TemplateRef<any>;

  constructor(
    private superHeroesService: SuperHeroesService,
    public dialog: MatDialog
  ) {}

  heroForm: FormGroup = new FormGroup({});

  superHeroes: SuperHero[] = [];
  dataSource: MatTableDataSource<SuperHero> = new MatTableDataSource();
  pageSize: number = 10;
  currentPage: number = 0;
  count: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  listValues: string[] = [];
  genderValues: string[] = ['male', 'female'];
  activeSort: string = 'nameLabel';
  charName: string = 'Char gender';
  typeChar: string = 'bars';
  currentHero: any;
  isView: boolean = true;
  idxEdit: number = -1;
  configBar: CharConfig = {
    margin: 20,
    width: 100,
    height: 100,
  };

  data: any[] = [];

  displayedColumns: string[] = [
    'name',
    'gender',
    'citizenship',
    'skills',
    'occupation',
    'memberOf',
    'creator',
    'edit',
    'delete',
  ];

  ngOnInit(): void {
    this.getHeroes();
  }

  sortData(sort: Sort) {
    const data = this.superHeroes.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      return;
    }

    this.dataSource = new MatTableDataSource(
      data.sort((a: any, b: any) => {
        const isAsc = sort.direction === 'asc';
        if (Boolean(a[sort.active])) {
          return this.compare(a[sort.active], b[sort.active], isAsc);
        } else {
          return 0;
        }
      })
    );
    this.dataSource.paginator = this.paginator;
  }

  private compare(a: string, b: string, isAsc: boolean) {
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }

  superHeroesPreview(row: SuperHero) {
    this.isView = true;
    if (row === this.currentHero) {
      this.currentHero = null;
      return false;
    }
    this.currentHero = row;
    this.heroForm = new FormGroup({
      nameLabel: new FormControl(
        { value: row.nameLabel, disabled: true },
        Validators.required
      ),
      genderLabel: new FormControl(
        { value: row.genderLabel, disabled: true },
        Validators.required
      ),
      citizenshipLabel: new FormControl(
        { value: row.citizenshipLabel, disabled: true },
        Validators.required
      ),
      skillsLabel: new FormControl(
        { value: row.skillsLabel, disabled: true },
        Validators.required
      ),
      occupationLabel: new FormControl(
        { value: row.occupationLabel, disabled: true },
        Validators.required
      ),
      memberOfLabel: new FormControl(
        { value: row.memberOfLabel, disabled: true },
        Validators.required
      ),
      creatorLabel: new FormControl(
        { value: row.creatorLabel, disabled: true },
        Validators.required
      ),
    });

    this.openDialog();
    return false;
  }

  handlePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
  }

  filter(values: string[]) {
    let filterValues: SuperHero[] = this.superHeroes.slice();
    if (values?.length > 0) {
      filterValues = this.superHeroes.filter((el: SuperHero) =>
        values.includes(el.nameLabel)
      );
    }
    this.dataSource = new MatTableDataSource(filterValues);
  }

  createHero() {
    this.isView = false;
    this.heroForm = new FormGroup({
      nameLabel: new FormControl('', Validators.required),
      genderLabel: new FormControl('', Validators.required),
      citizenshipLabel: new FormControl('', Validators.required),
      skillsLabel: new FormControl('', Validators.required),
      occupationLabel: new FormControl('', Validators.required),
      memberOfLabel: new FormControl('', Validators.required),
      creatorLabel: new FormControl('', Validators.required),
    });
    this.openDialog();
  }

  editHero(ev: Event, row: SuperHero) {
    ev.stopPropagation();
    this.isView = false;
    this.idxEdit = this.superHeroes.findIndex((el: SuperHero) => el === row);
    this.heroForm = new FormGroup({
      nameLabel: new FormControl(row.nameLabel, Validators.required),
      genderLabel: new FormControl(row.genderLabel, Validators.required),
      citizenshipLabel: new FormControl(
        row.citizenshipLabel,
        Validators.required
      ),
      skillsLabel: new FormControl(row.skillsLabel, Validators.required),
      occupationLabel: new FormControl(
        row.occupationLabel,
        Validators.required
      ),
      memberOfLabel: new FormControl(row.memberOfLabel, Validators.required),
      creatorLabel: new FormControl(row.creatorLabel, Validators.required),
    });
    this.openDialog();
  }

  deleteHero(ev: Event, row: SuperHero) {
    ev.stopPropagation();
    const config = DIALOG_CONFIG;
    config.maxHeight = 'auto';
    config.maxWidth = '30vw';
    config.width = '30vw';
    config.height = 'auto';
    this.dialog
      .open(DynamicDialogComponent, {
        ...config,
        data: {
          type: DialogType.DANGER.valueOf(),
          containedText: `Delete hero ${row.nameLabel}?`,
          buttonConfig: {
            buttonList: [
              {
                id: 'acceptButton',
                text: 'accept',
                styleType: DialogButtonStyleType.PRIMARY,
                onClick: () => {
                  this.superHeroes = this.superHeroes.filter(
                    (el: SuperHero) => el !== row
                  );
                  this.initTable();
                },
              },
              {
                id: 'cancelButton',
                text: 'cancel',
                styleType: DialogButtonStyleType.SECONDARY,
              },
            ],
          },
        },
      })
      .afterClosed()
      .subscribe((action: () => void) => action());
  }

  openDialog() {
    this.dialog
      .open(DynamicDialogComponent, {
        ...DIALOG_CONFIG,
        disableClose: true,
        data: {
          template: this.viewHeroDialog,
          containedText: '',
          buttonConfig: {
            buttonList: [
              {
                id: 'acceptButton',
                text: 'Accept',
                styleType: DialogButtonStyleType.PRIMARY,
                isDisabled: (): boolean => {
                  return !this.heroForm.valid;
                },
                onClick: () => {
                  if (!this.isView) {
                    if (this.idxEdit !== -1) {
                      this.superHeroes[this.idxEdit] =
                        this.heroForm.getRawValue();
                    } else {
                      this.superHeroes.push(this.heroForm.getRawValue());
                    }
                    this.idxEdit = -1;
                    this.initTable();
                  }
                  this.isView = true;
                },
              },
              {
                id: 'cancelButton',
                text: 'Cancel',
                styleType: DialogButtonStyleType.SECONDARY,
                onClick: () => {},
              },
            ],
          },
        },
      })
      .afterClosed()
      .subscribe((action: () => void) => action());
    return false;
  }

  getHeroes() {
    const data = localStorage.getItem('dataSource');
    if (data) {
      this.superHeroes = JSON.parse(data);
      this.initTable();
    } else {
      this.superHeroesService.getSuperheroes().subscribe(
        (res: SuperHero[]) => {
          this.superHeroes = res;
          this.initTable();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  initTable() {
    localStorage.setItem('dataSource', JSON.stringify(this.superHeroes));
    this.listValues = this.superHeroes.map((el: any) => el.nameLabel);
    const numMales: number = this.superHeroes.filter(
      (el: any) => el.genderLabel === 'male'
    ).length;
    const numFemales: number = this.superHeroes.filter(
      (el: any) => el.genderLabel === 'female'
    ).length;
    this.data = [
      { gender: 'male', count: numMales.toString() },
      { gender: 'female', count: numFemales.toString() },
    ];
    this.count = this.superHeroes.length;
    const data = this.superHeroes.slice();
    this.dataSource = new MatTableDataSource(
      data.sort((a: any, b: any) => {
        return this.compare(a[this.activeSort], b[this.activeSort], true);
      })
    );
    this.dataSource.paginator = this.paginator;
  }
}
