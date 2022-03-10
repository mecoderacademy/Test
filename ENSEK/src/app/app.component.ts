import { Component, OnInit } from '@angular/core';
import { FileExportService } from './fileUploadSubscriperService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void { }
  private _fileExportService: FileExportService | undefined;
  private http: HttpClient;
  public file: File = null;
  public validation: string = "";
  public files: Array<File> = null;
  public allFilesResponse :Array<any> = new Array<any>();
  constructor(fileUploadService: FileExportService, http: HttpClient) {
    this._fileExportService = fileUploadService
    this._fileExportService.fileUploaded.subscribe(this.onFileUploaded)
    this.http = http;
  }

  title = 'Bacs';
  isLoading: boolean = false;
  

 onFileUploaded(fileToUpload: File) :File{
   return fileToUpload;
  }

  async onSave() {
    this.validation="";
    this.isLoading = true;
    let formData: FormData = new FormData();
    this.file=this._fileExportService.file;
    formData.append('fileToUpload', this.file, this.file.name);
    
    setTimeout(() => {
     
      console.log(formData.get("fileToUpload"))
      this.http.post('https://localhost:44347/FileProccessor/meter-reading-uploads', formData)
  
        .subscribe(res => {
          this.isLoading = false;
         let response= res as any[];
         response.forEach((item)=>{
           console.log(item)
          this.allFilesResponse.push(item.responseMessage)
         }) 
          
        })
        this.isLoading = false;
    }, 500);
   
   
}}
