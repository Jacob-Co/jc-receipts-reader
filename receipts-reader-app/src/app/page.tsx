'use client'
import Form from "react-bootstrap/Form";

export default function Home() {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null || files.length === 0) return;
    // Convert FileList → Array so we can loop easily
    Array.from(files).forEach(file => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target === null) return;
          const dataUrl = e.target.result;
          console.log(dataUrl);
      };

      reader.readAsDataURL(file);
    });
  }

  return (
    <div>
      <Form.Group controlId="formFileMultiple">
        <Form.Label>Upload Multiple Receipt Photos</Form.Label>
        <Form.Control type="file" multiple accept="image/*" onChange={handleFileInput}/>
      </Form.Group>
      <p>Processing 10 receipts</p>
      <p>For Review 10 receipts</p>
    </div>
  );
}
