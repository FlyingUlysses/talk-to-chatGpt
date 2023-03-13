import React,{ useState } from "react";
import Chat,{ useMessages,Bubble,Modal,Input } from "@chatui/core";
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
        icon:"info-circle",
        onClick: openSetting
      }
    ];
  }

  // #####################  navbar  ###################################

  // #####################  setting  ###################################
  
  const [open, setOpen] = useState(false);
  const [openApiKey, setOpenApiKey] = useState(null);
  const [azureKey, setAzureKey] = useState(null);

  function openSetting(e) {
   setOpen(true);
  }


  // #####################  setting  ###################################

  // turn on voice msg
  function turnOnVoice(e) {
    voiceReaderMsg(e);
  }


  return (
    <div>
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
      <Modal
        active={open}
        title="系统设置"
        showClose={false}
        actions={[
          {
            label: '保存',
            color: 'primary',
          },
          {
            label: '取消',
          },
          ]}
        >
        <h3>Open-AI Key</h3>
        <Input value={openApiKey} onChange={val => setOpenApiKey(val)} placeholder="请输入..." />
        <h3>Azure Key</h3>
        <Input value={azureKey} onChange={val => setAzureKey(val)} placeholder="请输入..." />
      </Modal>
    </div>
  );
}
