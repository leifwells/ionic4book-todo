import { Component, OnInit } from '@angular/core';
import { AlertController, ItemSliding } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks: Array<Task> = [];
  items: Observable<Task[]>;
  itemsCollectionRef: AngularFirestoreCollection<Task>;

  constructor(
    public alertController: AlertController,
    private dialogs: Dialogs,
    public firestore: AngularFirestore) { }

  ngOnInit() {
    this.tasks = [
      { title: 'Milk', status: 'open' },
      { title: 'Eggs', status: 'open' },
      { title: 'Syrup', status: 'open' },
      { title: 'Pancake Mix', status: 'open' }
    ];

    this.itemsCollectionRef = this.firestore.collection('tasks');

    this.items = this.itemsCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // addTask() {
  //   const theNewTask: string = prompt('New Task');
  //   if (theNewTask !== '') {
  //     this.tasks.push({ title: theNewTask, status: 'open' });
  //   }
  // }

  markAsDone(task: Task, slidingItem: ItemSliding) {
    // task.status = 'done';
    // // Firestore
    // this.itemsCollectionRef.doc(task.id).update({ status: task.status });

    // slidingItem.close();
  }

  removeTask(task: Task, slidingItem: ItemSliding) {
    // Array
    task.status = 'removed';
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    // Firestore
    this.itemsCollectionRef.doc(task.id).delete();

    slidingItem.close();
  }

  // Promise
  addTask2() {
    const alert = this.alertController.create({
      header: 'Add Task',
      inputs: [
        {
          type: 'text',
          name: 'task',
          id: 'task-id',
          value: '',
          placeholder: 'Task Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            // Array
            // this.tasks.push({ title: data.task, status: 'open' });

            // Firestore
            this.itemsCollectionRef.add({ title: data.task, status: 'open', dueDate: '' });
          }
        }
      ]
    }).then(myAlert => myAlert.present());
  }

  // async
  async addTask() {
    const alert = await this.alertController.create({
      header: 'Add Task',
      inputs: [
        {
          type: 'text',
          name: 'task',
          id: 'task-id',
          value: '',
          placeholder: 'Task name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            // Array
            // this.tasks.push({ title: data.task, status: 'open' });

            // Firestore
            this.itemsCollectionRef.add({ title: data.task, status: 'open', dueDate: '' });
          }
        }
      ]
    });
    alert.present();
  }
}
