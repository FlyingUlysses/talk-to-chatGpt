import axios from 'axios';
import config from '../config.js'

// get请求
export function getRequest(url,sendData){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params:sendData}).then(res=>{
            resolve(res.data);    
      }).catch(error=>{
            reject(error);    
      })                 
    })
}

// post请求
export function postRequest(url,sendData){
    return new Promise((resolve,reject)=>{
        axios.post(url,sendData).then(res=>{
            resolve(res.data);    
      }).catch(error=>{
            reject(error);    
      })                 
    })
}

// chat to chatGpt
export function chatToChatGpt(msg) {
    const params_ = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: msg }],
        temperature: 0,
    };
    const headers_= {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.openApiKey
    }
    // const headers_ = 
    return new Promise((resolve,reject)=>{
        axios.post("https://api.openai.com/v1/chat/completions",
            params_,
            {headers:headers_}).then(res=>{
                resolve(res.data.choices[0].message.content.trim());    
      }).catch(error=>{
            reject(error);    
      })                 
    })
}

// microsoft text to voice
export function textToVoice(text) {
    var SpeechSDK = require("microsoft-cognitiveservices-speech-sdk");
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(config.speechKey, config.sppechRegion);
    speechConfig.speechSynthesisVoiceName = "en-US-JaneNeural";
    var synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(
        text,
        function (result) {
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
                console.info("synthesis failed. Error detail: " + result.errorDetails + "\n");
            }
            synthesizer.close();
            synthesizer = undefined;
        },
        function (err) {
            console.error(err);
            synthesizer.close();
            synthesizer = undefined;
        }
    );
}