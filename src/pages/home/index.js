import React, { useRef, useState } from "react";
import { API, Auth } from "aws-amplify";

import { onError } from "../../libs/errorLib";
import { useAppContext } from "../../libs/contextLib";

import Header from "../../components/header";
import { TextField } from "@material-ui/core";

import "./styles.css";


export default function Home() {
  const { isAuthenticated } = useAppContext();

  const [crushName, setCrushName] = useState("");
  const [crushEmail, setCrushEmail] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return crushName.length > 0 && crushEmail.length > 0 && content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const message = {
      crush_name: crushName,
      crush_email: crushEmail,
      content,
    };

    try {
      if (!isAuthenticated) {
        await sendMessage(message);
      } else {
        await sendMessage(message);
        await createMessage(message);
      }

      alert("Mensagem enviada");
    } catch (err) {
      console.log(err);
      onError(err);
      setIsLoading(false);
    }
  }

  function sendMessage(message) {
    return API.post("cupido-online", "/email", {
      body: message,
    });
  }

  function createMessage(message) {
    return API.post("cupido-online", "/message", {
      body: message,
    });
  }

  return (
    <div className="Home">
      <Header />
      <div className="HomeBody">
        <div className="HomeAbout">
          <h2>Bem-Vindo</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            elementum augue. Pellentesque in ultrices mi. Proin pharetra
            vulputate justo, ac tristique est tempor a. Sed feugiat ipsum
            hendrerit elit rhoncus, eu eleifend eros accumsan. Nulla quis
            gravida lacus. Phasellus feugiat metus ut maximus faucibus. Integer
            non rutrum odio. Duis at ipsum sodales ipsum aliquet dignissim
            hendrerit eget eros. Interdum et malesuada fames ac ante ipsum
            primis in faucibus.
          </p>
        </div>
        <div className="HomeMailerWrapper">
          <h2>Nova Mensagem</h2>
          <form className="HomeMailerCard" onSubmit={handleSubmit}>
            <TextField id="standard-basic" placeholder="Nome" onChange={(e) => setCrushName(e.target.value)} />
            <TextField id="standard-basic" placeholder="Email" type="email" onChange={(e) => setCrushEmail(e.target.value)}/>
            <p>Mensagem</p>
            <TextField id="outlined-multiline-flexible" multiline rowsMax={4} variant="outlined" onChange={(e) => setContent(e.target.value)}/>
            <input className="MailerCardSubmit" type="submit" value="Enviar" disabled={!validateForm()} />
          </form>
        </div>
      </div>
    </div>
  );
}
