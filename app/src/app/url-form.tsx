'use client'
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { backendUrl } from "./backend-constants";
import { useRouter } from "next/navigation";

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(true);
  const handleUrlChange = (event: React.ChangeEvent<HTMLDataElement>) => {
    const {value} = event.target;
    if (value === "" || value.startsWith("http://") || value.startsWith("https://")) {
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }

    setUrl(event.target.value);
  }

  const [code, setCode] = useState('');
  const handleCodeChange = (event: React.ChangeEvent<HTMLDataElement>) => {
      setCode(event.target.value);
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async () => {
    setIsSubmitting(true);

    const body = JSON.stringify({
      url,
      code
    });

    const res = await fetch(backendUrl + '/api/links',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body
    })

    /*
    Display a clear error message when creation fails (e.g., alias collision)
    */

    setIsSubmitting(false); 
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="total">
        <Form.Label>Url</Form.Label>
        <Form.Control disabled={isSubmitting} type="text" value={url} onChange={handleUrlChange}/>
        <Form.Text className="text-muted">
          {!isUrlValid
            ? "Must start with either http:// or https://"
            : ""
          }
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="total">
        <Form.Label>Code</Form.Label>
        <Form.Control disabled={isSubmitting} type="text" value={code} onChange={handleCodeChange}/>
      </Form.Group>

      <Button 
        disabled={isSubmitting}
        onClick={handleFormSubmit} 
        variant="primary" 
      >
        Submit
      </Button>
    </Form>

  )

}