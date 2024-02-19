import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})
export class AddElementComponent implements OnInit{
  constructor(private api: ApiService, private toastr: ToastrService){}
  names: any[] = []
  fileContent:string = "";

  defaultAge = "";
  defaultManners = "";
  defaultPersonality = "";
  defaultOptimism = "";
  defaultGender = "";
  defaultDatable = "";
  defaultLoveInterest = "";

  ngOnInit(): void {
      this.api.getNpcNames().subscribe((data: any[]) => {
        this.names = data
      })
  }

  // Llama a la función para añadir elementos y le manda los campos del formulario.
  onSubmit(value: any){
    // Pedimos confirmación al usuario
    if(window.confirm('Are sure you want to add this element?')){
      this.api.insertElement(value).subscribe(
        (response) => {
          // Mostramos el pop up
          this.showSuccess();
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
                // Llamamos al pop up
                this.showSuccess();
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
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      this.fileContent = fileReader.result as string;
    };
    fileReader.readAsText(file);
  }


  villagerSubmit(data: any){

  }

  // Pop up para mostrar un mensaje al usuario informándole de que la acción se ha realizado.
  showSuccess() {
    this.toastr.success('Element(s) added!');
  }
}
