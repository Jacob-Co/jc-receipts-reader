'use client'
import {customReceiptPostUrl} from "../backend-constants";
import {TagDto, ReceiptDto, CategoryDto} from "../backend-types";
import { createReceipt } from "../backend-calls";
import { ReceiptFormAction } from "./constants"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import type React from "react";

type Props = {
    receipt?: ReceiptDto,
    categories: CategoryDto[],
    tags: TagDto[],
    receiptFormAction: ReceiptFormAction 
}

export default function ReceiptForm(
    {categories, tags, receiptFormAction} : Props    
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
    const [categoryId, setCategoryId] = useState(categories[0].id);
    const handleCategoryChange = (event: React.ChangeEvent) => {
        setCategoryId(Number(event.target.value));
    }
    const [tagId, setTagId] = useState(tags[0].id);
    const handleTagChange = (event: React.ChangeEvent) => {
        setTagId(Number(event.target.value));
    }

    const handleFormSubmit = async () => {
        let numberOnly = total.replace(/[^0-9.]/g, '');
        const receiptCreation =  ({
            imageId: null,
            date: (new Date(isoDate)).getTime(),
            total: Number(numberOnly),
            categoryId,
            tagId,
        });

        if (receiptFormAction === ReceiptFormAction.Create) {
            await createReceipt(receiptCreation);
        }

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
            value={categoryId}
            onChange={handleCategoryChange}
        >
            {categories.map(category=> { return (
                <option 
                    key={category.id}
                    value={category.id}
                >
                    {category.name}
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
            value={tagId}
            onChange={handleTagChange}
        >
            {tags.map(tag => { return (
                <option 
                    key={tag.id}
                    value={tag.id}
                >
                    {tag.name}
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
          {
              receiptFormAction
          }
      </Button>
    </Form>
  );
} 
