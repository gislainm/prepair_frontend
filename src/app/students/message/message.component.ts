import { Component,inject,NgZone,OnInit,ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { AuthenticaUserService } from 'src/app/authentica-user.service';
import { IauthUser,User } from 'src/app/user.interface';
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
  chatContainer!:[{user:User,messages:[Message]}]
  collaborators:any[] = [];
  serviceCollabs:any[] = [];
  searchedCollabs:any[]=[];
  selectedMess:string = '';
  selectedColab:string = '';
  activeRoom!:ChatRoom;
  messageLoaded:boolean = false;
  firstMessaMentor:boolean=false;
  newMentorMess_Id:(string|null) = null;
  newMentorMessFirstname:(string|null) = null;
  newMentorMessLastname:(string|null) = null;
  constructor(private _ngZone:NgZone,private stateService:AuthenticaUserService){}
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
  messageForm = inject(FormBuilder).nonNullable.group({
    message:['',[]]
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
          })
          this.collaborators = this.serviceCollabs;
        }
        this.messageNewMentor();
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
            let lastMessage = this.messageForm.value.message as string;
            this.messageForm.reset();
            if(this.activeRoom){
              this.activeRoom.messages = data.data.messages;
            }
            if(lastMessage.length>34){
              lastMessage = lastMessage.slice(0,33)+'...'
            }
            const currentCollab = this.collaborators.find(collab=>collab.collaborator._id === this.selectedMess);
            currentCollab.lastMessage = lastMessage;
          }
        },
        error:(error:HttpErrorResponse)=>{
          console.log(error);
        }
      })
      this.firstMessaMentor = false;
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
  sendMessageToNewMentor(){
    this.stateService.sendMessage({receiver:this.newMentorMess_Id as string,sender:this.user_id,messageBody:this.messageForm.value.message as string})
    .subscribe({
      next:(data:any)=>{
        if(data.error){
          console.log(data.error);
        }else{
          let lastMessage = this.messageForm.value.message as string;
          this.messageForm.reset();
          this.chatRooms.push(data.data);
          this.firstMessaMentor = false;
          const mentor_id = this.newMentorMess_Id as string;
          this.newMentorMess_Id = null;
          this.selectRoom(mentor_id,this.newMentorMessFirstname!,this.newMentorMessLastname!);
          this.newMentorMessFirstname = null;
          this.newMentorMessLastname = null;
          if(lastMessage.length>34){
            lastMessage = lastMessage.slice(0,33)+'...'
          }
          const currentCollab = this.collaborators.find(collab=>collab.collaborator._id === this.selectedMess);
          currentCollab.lastMessage = lastMessage;
         }
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }
  messageNewMentor(){
    if(this.stateService.MentorToMessage){
      const mentor = this.stateService.MentorToMessage;
      this.stateService.MentorToMessage = null;
      this.newMentorMess_Id = mentor._id;
      this.newMentorMessFirstname = mentor.Firstname;
      this.newMentorMessLastname = mentor.Lastname;
      this.serviceCollabs.push({collaborator:mentor,lastMessage:''});
      this.firstMessaMentor = true;
    }else{
      this.firstMessaMentor = false;
    }
  }
  selectRoom(id:string,Firstname:string,Lastname:string){
    if(id !== this.newMentorMess_Id){
      this.selectedMess = id;
      this.selectedColab = Firstname+" "+Lastname;
      this.loadMessage(id);
      this.firstMessaMentor = false;
    }else{
      this.firstMessaMentor = true;
    }
  }
  loadMessage(id:string){
    const activeChatRoom = this.chatRooms.filter(chatRoom=>{
      return chatRoom.participants.find((participant:any)=>participant._id  === id)
    })
    this.activeRoom = activeChatRoom[0] as ChatRoom;
    this.firstMessaMentor = false;
    this.messageLoaded = true;
  }
}
