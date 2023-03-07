import React from "react";
import Chat,{ useMessages,Bubble} from "@chatui/core";
import "@chatui/core/dist/index.css";

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  
  async function createCompletion(msg) {
    const params_ = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: msg }],
        temperature: 0,
    };
    const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer xx'
        },
        body: JSON.stringify(params_)
    });
    const stream = result.body
    const output = await fetchStream(stream);
    const resMsgObj  =output.choices[0].message;
    appendMsg({
      type: "text",
      content: { text: resMsgObj.content.trim() }
    });
  }

  async function fetchStream(stream) {
      const reader = stream.getReader();
      let charsReceived = 0;
      const li = document.createElement("li");

      // read() returns a promise that resolves
      // when a value has been received
      const result = await reader.read().then(
          function processText({ done, value }) {
              // Result objects contain two properties:
              // done  - true if the stream has already given you all its data.
              // value - some data. Always undefined when done is true.
              if (done) {
                  return li.innerText;
              }
              // value for fetch streams is a Uint8Array
              charsReceived += value.length;
              const chunk = value;
              li.appendChild(document.createTextNode(chunk));
              return reader.read().then(processText);
          });
      const list = result.split(",")
      const numList = list.map((item) => {
          return parseInt(item)
      })
      const text = String.fromCharCode(...numList);
      const response = JSON.parse(text)
      return response
  }

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      setTyping(true);

      //request to chatGpt
      createCompletion(val);

    }
  }

  

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  // #####################  navbar  ###################################
  function renderLeftContent() {
    return {
      icon:"apps"
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
    console.log("turn on voice state");
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
