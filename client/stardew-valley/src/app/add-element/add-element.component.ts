import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { flush } from '@angular/core/testing';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})
export class AddElementComponent implements OnInit{
  constructor(private api: ApiService, private toastr: ToastrService){}
  names: any[] = []
  achievements: any[] = []
  wrongFormat:boolean = false
  isNotComplete: boolean = false
  fileContent:string = "";
  fileName:string = "None";
  imgUrl: string = ""
  imgAUrl: string = ""
  wrongImgFormat: boolean = false;
  wrongAImgFormat: boolean = false;
  defaultAge = "";
  defaultManners = "";
  defaultPersonality = "";
  defaultOptimism = "";
  defaultGender = "";
  defaultDatable = "";
  defaultLoveInterest = "";
  
  defaultDisplay = "";
  defaulPrerequisite = "";

  defaultMonth = "";

  ngOnInit(): void {
      this.api.getNpcNames().subscribe((data: any[]) => {
        this.names = data
      })
      this.api.getAchievements().subscribe((data: any[]) => {
        this.achievements = data
      })
  }

  // Llama a la función para añadir elementos y le manda los campos del formulario.
  onSubmit(value: any){
    // Pedimos confirmación al usuario
    if(window.confirm('Are sure you want to add this element?')){
      this.api.insertElement(value).subscribe(
        (response) => {
          // Refrescamos la página
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log('API Response:', response);
        },
        (error) => {
          console.error('API Error:', error);
          
        }
      );
    } else{
      console.log(value)
    }
  }

  // Llama a la función para añadir elementos y le manda el JSON.
  onSubmitFile(){
    if(this.fileContent){
      try {
        // Parseamos el contenido del archivo para que se envíe correctamente
        const elementData = JSON.parse(this.fileContent);
        if(elementData){
          // Pedimos confirmación al usuario
          if(window.confirm('Are sure you want to add this element(s)?')){
            this.api.insertElement(elementData).subscribe(
              (response) => {
                // Refrescamos la página
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
                console.log('API Response:', response);
              },
              (error) => {
                console.error('API Error:', error);
              }
            );
          }
        } else {
          console.error('Not valid JSON file.');
        }
      } catch (error) {
        console.error('Couldn\'t analyze the JSON file: ', error);
        console.error('Not valid JSON file.');
      }
    }
  }

  // Muestra el contenido del JSON seleccionado por el usuario
  fileUploaded(event: any) {
    const file = event.target.files[0];
    this.fileName = file.name;
    if(file.name.split(".")[1] != "json"){
      this.wrongFormat = true;
      this.isNotComplete = false;
      return;
    }
    this.wrongFormat = false;
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = () => {
      this.fileContent = JSON.parse(fileReader.result as string);
      if(Array.isArray(this.fileContent)){
        for(let i = 0; i < this.fileContent.length; i++){
          if(!this.checkAttributes(this.fileContent[i])){
            this.isNotComplete = true
            return;
          }
        }
      } else{
        if(!this.checkAttributes(this.fileContent)){
          this.isNotComplete = true
          return;
        }
      }
      this.isNotComplete = false;
    };
    
  }

  checkAttributes(content: any): boolean{
    if(!content.type){
      swal.fire({
        text: "This is not a valid JSON file!",
        icon: "error"
      });
      return false;
    } 

    if(content.type == "npc" && (!content.name || !content.age || !content.manners || !content.social_anxiety ||
        !content.optimism || !content.gender || !content.datable || !content.love_interest || !content.home_region ||
        !content.birthday || !content.relationships || !content.start_location || !content.img)){
          swal.fire({
            text: "This is not a valid JSON file!",
            icon: "error"
          });
          return false
    }else if(content.type == "achievement" && ( !content.id || !content.name || !content.description || !content.display_on_collections_tab_before_earned
        || !content.prerequisite_achievement || !content.hat_earned || !content.img)){
          swal.fire({
            text: "This is not a valid JSON file!",
            icon: "error"
          });
          return false
    } else{
      return true
    }
  }
  submitElement(data: any, isNpc: boolean){
    data.type = isNpc ? "npc" : "achievement";
    if(data.type == "npc"){
      data.relationships = " "
      data.start_location = "Town"
      data.birthday = data.month + " " + data.day
      data.img = this.imgUrl
    } else{
      data.hat_earned = 0
      data.img = this.imgAUrl
    }
    console.log(data)
    if(confirm("Are you sure you want to add this item?")){
      this.api.insertElement(data).subscribe(
        (response) => {
          console.log(response);
          swal.fire({
            text: "Element added successfully!",
            icon: "success"
          });
        }, (error) => {
          console.log(error)
        })
    }
    
  }


  imgUploaded(url: any){
    let extension = url.split(".")[url.split(".").length - 1].trim();
    console.log(extension)
    if(extension != "png" && extension != "jpg"){
      swal.fire({
        text: "The image URL must be png or jpg!",
        icon: "error"
      });
      this.wrongImgFormat = true;
      return;
    }
    this.imgUrl = url
    this.wrongImgFormat = false;
  }

  imgAUploaded(url: any){
    let extension = url.split(".")[url.split(".").length - 1].trim();
    console.log(extension)
    if(extension != "png" && extension != "jpg"){
      swal.fire({
        text: "The image URL must be png or jpg!",
        icon: "error"
      });
      this.wrongAImgFormat = true;
      return;
    }
    this.imgAUrl = url
    this.wrongAImgFormat = false;
  }
}
