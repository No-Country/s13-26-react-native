import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { encode } from "base-64";

export const CloudinaryServices = ({folder}) => {

  const [resources, setResources] = useState(undefined)

  const cloudinaryURL =
    `https://api.cloudinary.com/v1_1/dfckmaczy/resources/image?type=upload&prefix=${folder}`;
  const apiKey = "795927674275666";
  const apiSecret = "iFQdowbD74Fgp_aKfPalZUspRDo";

  function encodeCredentials(username, password) {
    return encode(`${username}:${password}`);
  }

  async function getImages() {
    const credentials = encodeCredentials(apiKey, apiSecret);
    const authHeader = `Basic ${credentials}`;

    try {
      const res = await fetch(cloudinaryURL, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      
      setResources(data?.resources[0]?.url)
      
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    }
  }

  useEffect(() => {
    getImages();
  }, [folder]);

  return resources
};
