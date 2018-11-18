import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListPage } from './task-list.page';
import { AlertController } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';

describe('TaskListPage', () => {
  let component: TaskListPage;
  let fixture: ComponentFixture<TaskListPage>;

  const mockTasks = [
    { title: 'Milk', status: 'open' },
    { title: 'Eggs', status: 'open' },
    { title: 'Syrup', status: 'open' },
    { title: 'Pancake Mix', status: 'open' }
  ];

  const FirestoreStub = {
    collection: (name: string) => ({
      snapshotChanges: () => of(mockTasks),
      // tasks: (_id: string) => ({
      //   valueChanges: () => of(mockTasks),
      //   snapshotChanges: () => of(mockTasks),
      //   set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      // }),
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListPage ],
      providers: [
        AlertController,
        { provide: AngularFirestore, useValue: FirestoreStub },
        Dialogs
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
