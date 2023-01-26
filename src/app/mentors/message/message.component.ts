import { Component,inject,NgZone,OnInit,ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { AuthenticaUserService } from 'src/app/authentica-user.service';
import { IauthUser,User,Role,Gender } from 'src/app/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Message,ChatRoom } from 'src/app/chat.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  user_id!:string;
  searchInput:string='';
  chatRooms!:[ChatRoom];
  collaborators:any[] = [];
  serviceCollabs:any[] = [];
  searchedCollabs:any[]=[];
  selectedMess:string = '';
  selectedColab:string = '';
  activeRoom!:ChatRoom;
  messageLoaded:boolean = false;
  constructor(private _ngZone:NgZone,private stateService:AuthenticaUserService){}
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  messageForm = inject(FormBuilder).nonNullable.group({
    message:['']
  })
  ngOnInit(): void {
    this.stateService.state.subscribe((state:IauthUser)=>{
      this.user_id = state.user._id;
    });
    this.stateService.getChatRooms(this.user_id).subscribe({
      next:(data:any)=>{
        this.chatRooms = data.data as [ChatRoom]
        if(this.chatRooms.length>0){
          this.chatRooms.forEach(chatRoom=>{
            const collaborator = chatRoom.participants.find((user:any)=>user._id !== this.user_id)
            let lastMessage = chatRoom.messages[chatRoom.messages.length -1].messageBody;
            if(lastMessage.length>34){
              lastMessage = lastMessage.slice(0,33)+'...'
            }
            this.serviceCollabs.push({collaborator,lastMessage});
            this.collaborators = this.serviceCollabs;
          })
        }
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error)
      }
    })
  }
  sendMessage(){
    this.stateService.sendMessage({receiver:this.selectedMess,sender:this.user_id,messageBody:this.messageForm.value.message as string})
      .subscribe({
        next:(data:any)=>{
          if(data.error){
            console.log(data.error);
          }else{
            this.messageForm.reset();
            this.activeRoom.messages = data.data.messages;
          }
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error);
        }
      })
  }
  SearchMessage(event:any){
    this.searchInput = event.target.value;
    if(this.searchInput && this.collaborators.length>0){
      this.searchedCollabs = this.collaborators.filter(
        colab=> colab.collaborator.Firstname.toLowerCase().startsWith(this.searchInput.toLowerCase())||
        colab.collaborator.Lastname.toLowerCase().startsWith(this.searchInput.toLowerCase()))
        this.collaborators = this.searchedCollabs;
    }else{
      this.searchedCollabs = [];
      this.collaborators = this.serviceCollabs;
    }

  }
  selectRoom(id:string,Firstname:string,Lastname:string){
    this.selectedMess = id;
    this.selectedColab = Firstname+" "+Lastname;
    this.loadMessage(id);
  }
  loadMessage(id:string){
    const activeChatRoom = this.chatRooms.filter(chatRoom=>{
      return chatRoom.participants.find((participant:any)=>participant._id  === id)
    })
    this.activeRoom = activeChatRoom[0] as ChatRoom;
    this.messageLoaded = true;
  }

}
