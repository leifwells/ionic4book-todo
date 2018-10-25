import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.presentUpdateConfirm();
      });
    }
  }

  async presentUpdateConfirm() {
    const alert = await this.alertController.create({
      header: 'New version available!',
      message: 'Load New Version?',
      buttons: [
        {
          text: 'Skip',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Skip');
          }
        }, {
          text: 'OK',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });

    alert.present();
  }
}
