import React, {useState, useEffect} from 'react';
import axios from "axios";
import {DynamicObject} from "../constants/DynamicObject";
import useAuth from "./auth/useAuth";

export const NetworkConfig = {
  api_url: "https://52b0-176-88-45-167.ngrok-free.app/"
}

export function useAxios() {
  const {userData} = useAuth()

  async function GET(url: string, body: DynamicObject): Promise<DynamicObject> {
    let response = await axios.get(NetworkConfig.api_url + url, {
      params: body,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    return response.data
  }

  async function POST(url: string, body: DynamicObject): Promise<DynamicObject> {
    let response = await axios.post(NetworkConfig.api_url + url, body, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    return response.data
  }

  async function PATCH(url: string, body: DynamicObject): Promise<DynamicObject> {
    let response = await axios.patch(NetworkConfig.api_url + url, body, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    return response.data
  }

  async function DELETE(url: string, body: DynamicObject): Promise<DynamicObject> {
    let response = await axios.delete(NetworkConfig.api_url + url, {
      params: body,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    return response.data
  }

  async function FILEPOST(url: string, formData: FormData): Promise<DynamicObject> {
    let response = await axios.post(NetworkConfig.api_url + url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    return response.data
  }

  return {
    GET,
    POST,
    PATCH,
    DELETE,
    FILEPOST
  }
}