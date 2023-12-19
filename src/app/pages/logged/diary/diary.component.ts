import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {
  petHasDiary: boolean = false;
  diaryInfo: { [key: string]: any[] }= {};
  petInfo: any = {}; 
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(){
    this.b();
    
  }
  
  getDiaryKeys(): string[] {
    return Object.keys(this.diaryInfo);
  }

  a(){
    this.userService.getPet().then((res) => {
      if (res && res.pet) {
        this.petInfo = res.pet;
      }
    }
    )
  }

  b(){
    this.userService.petDiary().then((res) => {
      if(res){
        this.petHasDiary = true;
        this.a();
        this.diaryInfo = res;
        console.log(res);
      }
    })
  }
}
