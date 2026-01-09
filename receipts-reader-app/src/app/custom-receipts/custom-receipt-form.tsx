'use client'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import type React from "react";

type Props = {
    onSubmit: Function
}

export default function UploadContainer(
    {onSubmit} : Props    
) {
    const [isoDate, setIsoDate] = useState((new Date()).toISOString().slice(0,10));
    const handleIsoDateChange = (event: React.ChangeEvent) => {
        setIsoDate(event.target.value);
    }
    const [total, setTotal] = useState("0");
    const handleTotalChange = (event: React.ChangeEvent) => {
        let numberOnly = event.target.value.replace(/[^0-9.]/g, '');
        const numberParts = numberOnly.split(".");
        if (parts.length > 2) {
            numberOnly = parts[0] + "." + parts[1];
        }
        if (numberOnly[numberOnly.length - 1] === ".") {
            return setTotal(numbersOnly);
        }
        setTotal(Number(numbersOnly).toLocaleString());
    }
    const [tag, setTag] = useState(null);
    const [category, setCategory] = useState(null);

  return (
    <Form>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={isoDate} onChange={handleIsoDateChange}/>
        <Form.Text className="text-muted">
            Date of receipt
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Total</Form.Label>
        <Form.Control type="text" value={total} onChange={handleTotalChange}/>
        <Form.Text className="text-muted">
            Total cost of receipt
        </Form.Text>
      </Form.Group>

      <Button 
        onClick={() => onSubmit({date: (new Date(isoDate)).getTime(), total, tag, category})} 
        variant="primary" 
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
} 
