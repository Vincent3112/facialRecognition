import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { VipGroups } from './vip-groups';

@Component({
  selector: 'app-vips',
  templateUrl: './vips.component.html',
  styleUrls: ['./vips.component.scss']
})
export class VipsComponent implements OnInit {

  public displayedColumns = ['people', 'picture'];

  public vipList = new Array();

  public mainPanelIsLoaded = false;

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

}
