import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { VipGroups } from '../vips/vip-groups';
import { Track } from './track.model';
declare var require: any
const socket = require('socket.io-client');

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  
  private personIsAlreadyInThePermises = false;

  private vipPersonIsAlreadyInThePermises = false;

  public peopleInThePermises = new Array();

  public vipPeopleInThePermises = new Array();

  public isServiceHealthy = false;

  public mainPanelIsLoaded = false;

  constructor(private readonly authService : AuthService, private readonly router: Router) { }

  public ngOnInit(): void {
    this.authService.login();

    setTimeout(() => {
      this.connectToSocket();
    }, 2000);
  }
  
  private emptyTables(): void {
    this.vipPeopleInThePermises = [];
    this.peopleInThePermises = [];
    this.mainPanelIsLoaded = false;
    setTimeout(() => this.mainPanelIsLoaded = true, 2000);
    setTimeout(() => this.emptyTables(), 20000);
  }

  public numberOfStarToDisplay(group : string) : number {
    return group === VipGroups.GROUP1 ? 1 : 2;
  }

  private addPersonToDisplayer(track: Track) : void {
    this.personIsAlreadyInThePermises = false;
    this.vipPersonIsAlreadyInThePermises = false;
    for (let i = 0; i < this.peopleInThePermises.length; i ++) {
      if(this.peopleInThePermises[i].name === track.subject.name) {
        this.personIsAlreadyInThePermises = true;
      }
    }
    if(!this.personIsAlreadyInThePermises && track.subject.groups[0].title === VipGroups.GROUP1) this.peopleInThePermises.push(track.subject)

    for (let i = 0; i < this.vipPeopleInThePermises.length; i ++) {
      if(this.vipPeopleInThePermises[i].name === track.subject.name) {
        this.vipPersonIsAlreadyInThePermises = true;
      }
    }
    if(!this.vipPersonIsAlreadyInThePermises && track.subject.groups[0].title === VipGroups.GROUP2) this.vipPeopleInThePermises.push(track.subject)
  }

  public connectToSocket() : void {
    socket(`https://kong.tls.ai`, {
      rejectUnauthorized: false,
      path: '/bt/api/socket.io',
      transports: ['websocket'],
      query: {
        token: this.authService.authToken
      }
    }).on('connect', () => {

      this.mainPanelIsLoaded = true;
      this.emptyTables();

      socket(`https://kong.tls.ai`, {
        rejectUnauthorized: false,
        path: '/bt/api/socket.io',
        transports: ['websocket'],
        query: {
          token : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzExZjBmLWVjMzYtNGI1YS1iMDE3LTQ0YzAwNGNlNGRlNyIsInJvbGVJZCI6ImJkYzY4OTNmLTE0YjEtNGMwOS1hY2VkLTVhMzMxOTdkYTdmNSIsImlzRGF0YVJlc3RyaWN0ZWQiOmZhbHNlLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwiaXNBY3RpdmUiOnRydWUsImxvY2FsZSI6ImVuX3VzIiwidGltZXpvbmUiOiJBbWVyaWNhL05ld19Zb3JrIiwidXNlckdyb3VwSWQiOiIwMDAwMDAwMC0wMjAwLTc5MTItNTVhNy00NThkNDBkYTg3NjUiLCJqdGkiOiIzYzYxOGY5Ny1jNmUxLTQ2NWMtOGI2Mi01YTAyOGI3ZjFmOTAiLCJpYXQiOjE2MjU3NTE5MDgsImV4cCI6MTYyNTc4NzkwOH0.bb1Q6GkLlJQlPoYqgqkNJSXAyhbxOamQwTkPbtbGEaSRjraZjL12DhqrNyZzRzb09pf_KvhYX1j0T3ccRtJGpua3tjuWqqCGToUrGrthJtKHegq46cW9i6M0gMXxzR2CWcF8XZDMbAyXNJpQzFw0s9_TR2w1hymGe_swJaPluanbWckb9950d2pA9vO_EX0sFp5qwdx3PIHLkI5WFbRR-i8noWmVYEdJLkcRirtFqwj0pac88mzUe0bQbimhLEMITHj2eDsPQ_uDXrPG8EMyXhZQPweHvKToH8HytMUMvjR776SSSozG8lXqYYisWhDhiEvzfY8u3bvN5qTT_lo3naV62ouqVpG0COB9N6zaJD7tANkLgDl05g9BVPX5eUs5k-2FN8tSHuzZK3Wja59GyA80ZLNI94yliS4MNtMsErDJg2zt6_TbV-V3_AGU8srOKujeGSAcyx88Q_tmfcS1bIFcyxmvFBsOU7OjXa-OhIhFj24-cwhKD6XWJdDe489Z3NIuGyqt_YiLPdCY-heWzPp6AN9hlefIWDN14MREG2pVhJuMKoY4v8CCC_dl9101qeXz_fLhzm_7asi9sk3xEr4FN4d0YZqUq0LgQ0agLZXzAjEMQGBjqvAaD7juEvUSwIK4huCMaU8nd_Svj-_QQddMGCkaEtqf7RZ_6CYnrW8'
        }
      }).on('recognition:created', (track: Track[]) => {
        this.addPersonToDisplayer(track[0])
      });
    })
  }
}
