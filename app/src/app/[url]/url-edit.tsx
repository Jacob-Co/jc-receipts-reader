'use client'
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { backendUrl } from "../backend-constants";

type Props = {
  shortenedUrl: string
}


export default function UrlForm(
  {shortenedUrl}: Props
) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(backendUrl + "/s/" + shortenedUrl)
  }

  return (
    <>
    <p>{shortenedUrl}</p>
      <Button 
        onClick={handleCopy} 
        variant="primary" 
      >
        Copy
      </Button>
    </>

  )

}