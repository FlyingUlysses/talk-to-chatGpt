import axios from 'axios';

const open_ai_key = "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";

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
        'Authorization': 'Bearer  '+ open_ai_key
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