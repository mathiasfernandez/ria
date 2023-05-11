//import axios from 'axios';
import openai from 'openai';
import React,{Component} from 'react';
import '../css/header-login-style.css'
  


// Your API token is already set in this variable
const API_TOKEN = "efcbd72b3faf4c129aec026e3e65c699";

class UploadFile extends Component {



   
    state = {
  
      // Initially, no file is selected
      selectedFile: null
    };
     
    // On file select (from the pop up)
    onFileChange = event => {
     
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
     
    };
     
    // On file upload (click the upload button)
    onFileUpload = () => {
     
      // Create an object of formData
      const formData = new FormData();
     
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
     
      // Details of the uploaded file
      console.log(this.state.selectedFile);
     
      // Request made to the backend api
      // Send formData object
      //axios.post("api/uploadfile", formData);
      //let transcript = openai.Audio.transcribe("whisper-1", this.state.selectedFile)
      console.log(formData);
    };
     
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
     
      if (this.state.selectedFile) {
          
        return (
          <div>
            <h2>Detalles del archivo:</h2>
            <p>Nombre: {this.state.selectedFile.name}</p>
  
            <p>Tipo: {this.state.selectedFile.type}</p>
  
            <p>
              Ultima vez modificado:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
  
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
     
    render() {
     
      return (
        
        <div class="title-home">
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Transcribir
                </button>
        
          {this.fileData()}
        </div>
      );
    }
  }
  
  export default UploadFile;