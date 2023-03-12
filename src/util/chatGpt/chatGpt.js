export var gptMsgList = [];

export function addUserMsg(msg) {
    gptMsgList.push({
        role: "user", 
        content: msg 
    });
};

export function addAIMsg(msgObj) {
    gptMsgList.push(msgObj);
};