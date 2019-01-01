import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Task } from './../task';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  // tasks: Array<Task> = [] ;
  // FIREBASE
  tasks: Observable<Task[]>;
  itemsCollectionRef: AngularFirestoreCollection<Task>;

  constructor(public firestore: AngularFirestore, public dialog: Dialogs) { }

  ngOnInit() {
    //   this.tasks = [
    //     {title: 'Milk', status: 'open'},
    //     {title: 'Eggs', status: 'open'},
    //     {title: 'Syrup', status: 'open'},
    //     {title: 'Pancake Mix', status: 'open'}
    //  ];
    // FIREBASE
    this.itemsCollectionRef = this.firestore.collection('tasks');
    this.tasks = this.itemsCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addTask() {
    // const theNewTask: string = prompt('New Task');
    // if (theNewTask !== '') {
    //   this.tasks.push({ title: theNewTask, status: 'open' });
    // }
    // FIREBASE
    // const theNewTask: string = prompt('New Task');
    // if (theNewTask !== '') {
    //   this.itemsCollectionRef.add({ title: theNewTask, status: 'open' });
    // }
    // Cordova
    this.dialog.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '').then(
      theResult => {
        if ((theResult.buttonIndex === 1) && (theResult.input1 !== '')) {
          this.itemsCollectionRef.add({ title: theResult.input1, status: 'open' });
        }
      }
    );
  }

  markAsDone(task: Task, slidingItem: IonItemSliding) {
    // task.status = 'done';
    // slidingItem.close();
    // FIREBASE
    this.itemsCollectionRef.doc(task.id).update({ status: task.status });
    slidingItem.close();

  }

  removeTask(task: Task, slidingItem: IonItemSliding) {
    // task.status = 'removed';
    // const index = this.tasks.indexOf(task);
    // if (index > -1) {
    //   this.tasks.splice(index, 1);
    // }
    // slidingItem.close();
    // FIREBASE
    this.itemsCollectionRef.doc(task.id).delete();
    slidingItem.close();

  }

}
