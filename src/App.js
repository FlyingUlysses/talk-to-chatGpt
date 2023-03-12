import React from "react";
import Chat,{ useMessages,Bubble} from "@chatui/core";
import "@chatui/core/dist/index.css";
import {chatToChatGpt,textToVoice} from "./util/request/requestContext.js"

export default function App() {

  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      setTyping(true);

      //request to chatGpt
      chatToChatGpt(val).then(res => {
        appendMsg({
          type: "text",
          content: { text: res }
        });
      })
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} onClick={voiceReaderMsg} />;
  }

  function voiceReaderMsg(e) {
    if(messages != null && messages.length >0 && messages[messages.length-1].content.text) {
      textToVoice(messages[messages.length-1].content.text);
    }
  }

  // #####################  navbar  ###################################
  function openFunctionList(e) {
  }

  function renderLeftContent() {
    return {
      icon:"apps",
      onClick:openFunctionList
    }
  }

  function renderRightContent() {

    return [
      {
        icon:"apps"
      },
      {
        icon:"info-circle"
      }
    ];
  }

  // #####################  navbar  ###################################


  // turn on voice msg
  function turnOnVoice(e) {
    voiceReaderMsg(e);
  }


  return (
    <Chat
      navbar={{ title: "talk to chatGpt",leftContent:renderLeftContent(),rightContent:renderRightContent()}}
      messages={messages}
      inputType='text'
      onSend={handleSend}
      renderMessageContent={renderMessageContent}
      rightAction={
        {
          icon:"mic",
          onClick:turnOnVoice
        }
      }
    />
  );
}
