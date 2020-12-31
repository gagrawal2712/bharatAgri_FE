import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CropDialogComponent } from './crop-dialog/crop-dialog.component';
import { AuthService } from '../auth-service.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource: any ;
  displayedColumns = ['id',  'name', 'action'];
  constructor(private http: HttpClient, public dialog: MatDialog,
    private authService: AuthService) { }

  listCrop(){
    let sessionId = localStorage.getItem('sessionID');
    let headerDict = {
      'Authorization' : 'Token '+ sessionId
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.get(baseUrl+'crop/list_crop', requestOptions).subscribe(res=>{
      console.log(res)
      this.dataSource = res
    })
  }

  ngOnInit(): void {
    this.listCrop()
  }

  showDetail(element: any){
    const dialogRef = this.dialog.open(CropDialogComponent, {
      width: '250px',
      data: {id:element.id, name: element.name, 
        feature1: element.feature1, 
        feature2: element.feature2,
        feature3: element.feature3}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  signOut(){
    console.log('dash')
    this.authService.logout();
  }

}
