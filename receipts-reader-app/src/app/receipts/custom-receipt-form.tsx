'use client'
import {customReceiptPostUrl} from "../backend-constants";
import {TagDto, ReceiptDto, CategoryDto} from "../backend-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import type React from "react";

export enum ReceiptFormType {
    Create: "create";
    Edit: "edit";
    View: "view";
}

type Props = {
    categories: string[],
    tags: string[],
    type: ReceiptFormType
}

export default function ReceiptForm(
    {categories, tags, type} : Props    
) {
    const [isoDate, setIsoDate] = useState((new Date()).toISOString().slice(0,10));
    const handleIsoDateChange = (event: React.ChangeEvent) => {
        setIsoDate(event.target.value);
    }
    const [total, setTotal] = useState("0");
    const handleTotalChange = (event: React.ChangeEvent) => {
        let numberOnly = event.target.value.replace(/[^0-9.]/g, '');
        const numberParts = numberOnly.split(".");
        if (numberParts.length > 2) {
            numberOnly = numberParts[0] + "." + numberParts[1];
        }
        if (numberOnly[numberOnly.length - 1] === ".") {
            return setTotal(numberOnly);
        }
        setTotal(Number(numberOnly).toLocaleString());
    }
    const [category, setCategory] = useState(categories[0]);
    const handleCategoryChange = (event: React.ChangeEvent) => {
        setCategory(event.target.value);
    }
    const [tag, setTag] = useState(tags[0]);
    const handleTagChange = (event: React.ChangeEvent) => {
        setTag(event.target.value);
    }

    const handleFormSubmit = async () => {
        const body =  JSON.stringify({
            imageId: null,
            date: (new Date(isoDate)).getTime(),
            total: Number(total),
            categoryId: 16,
            tagId: 1,
            // category,
            // tag,
        });
        
        await fetch(customReceiptPostUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body
        })
    }

  return (
    <Form>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={isoDate} onChange={handleIsoDateChange}/>
        <Form.Text className="text-muted">
            Date of receipt
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="total">
        <Form.Label>Total</Form.Label>
        <Form.Control type="text" value={total} onChange={handleTotalChange}/>
        <Form.Text className="text-muted">
            Total cost of receipt
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Select 
            value={category}
            onChange={handleCategoryChange}
        >
            {categories.map(categoryVal => { return (
                <option 
                    key={categoryVal}
                    value={categoryVal}
                >
                    {categoryVal}
                </option>
            )})}
        </Form.Select>
        <Form.Text className="text-muted">
            Category of receipt
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tag">
        <Form.Label>Tag</Form.Label>
        <Form.Select 
            value={tag}
            onChange={handleTagChange}
        >
            {tags.map(tagVal => { return (
                <option 
                    key={tagVal}
                    value={tagVal}
                >
                    {tagVal}
                </option>
            )})}
        </Form.Select>
        <Form.Text className="text-muted">
            Add Tag for receipt
        </Form.Text>
      </Form.Group>

      <Button 
        onClick={handleFormSubmit} 
        variant="primary" 
      >
        Submit
      </Button>
    </Form>
  );
} 
