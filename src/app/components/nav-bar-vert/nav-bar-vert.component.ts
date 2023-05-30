import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nav-bar-vert',
  templateUrl: './nav-bar-vert.component.html',
  styleUrls: ['./nav-bar-vert.component.css']
})
export class NavBarVertComponent implements OnInit {

  user: any = {}

  constructor(private firebaseService: FirebaseService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  async loadUserInfo() {
    this.firebaseService.getUserInfo()
      .then((userInfo) => {
        this.user = {
          fullname: userInfo['firstName'] + ' ' + userInfo['lastName'],
          email: userInfo['email'],
          photoUrl: userInfo['photoUrl']
        }
      })
      .catch((error) => {
        console.error('Error al cargar la información del usuario:', error);
      });
    }

}
