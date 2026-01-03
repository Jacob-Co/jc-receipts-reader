'use client'
import Form from "react-bootstrap/Form";

export default function UploadContainer() {
  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null || files.length === 0) return;
    // Convert FileList → Array so we can loop easily
    const uploadPromises = Array.from(files).map(file => {
      return new Promise(res => {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
              if (e.target === null) return;
              const dataUrl = e.target.result;
              const regex = /data:.+\/.+;base64,/
              const base64Clean = dataUrl.replace(regex, ""); 
              console.log(base64Clean);
              res(base64Clean);
          };

          reader.readAsDataURL(file);
      });
    });
    await Promise.all(uploadPromises);
  }

  return (
    <div>
      <Form.Group controlId="formFileMultiple">
        <Form.Label>Upload Multiple Receipt Photos</Form.Label>
        <Form.Control type="file" multiple accept="image/*" onChange={handleFileInput}/>
      </Form.Group>
    </div>
  );
} 
