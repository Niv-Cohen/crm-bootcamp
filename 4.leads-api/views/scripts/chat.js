

let socket
let savedRoom
let savedHost
let clientID
let workerID
let timeOutEvent
let crmIsTyping = false
let typingElm = document.createElement("h1")
let clientTyping = false
typingElm.innerText = "Typing..."
let myStorage = window.localStorage;
let initMsgs = ['Hi There!',
    'In Order to Help I would like to know you better',
    'Please Enter Your Email']

const restoreConv = async () => {
    console.log("Restore Conv")
    try {
        const { room, host, worker, client } = JSON.parse(myStorage.getItem('info'))
        const req = await axios.post('http://localhost:8082/restore/', { room })
        const { roomObj, message } = req.data
        savedHost = host
        workerID = worker
        clientID = client
        savedRoom = room
        console.log(roomObj.conversation)
        roomObj.conversation.forEach((msgObj, index) => {
            displayMsg(msgObj, msgObj.from == clientID ?
                "my" : "others")
            let isNewDate = roomObj.conversation[index].date && ((index === 0) || (index > 0 &&
                roomObj.conversation[index].date.split(' ')[0]
                !== roomObj.conversation[index - 1].date.split(' ')[0]))
            if (msgObj.date) {
                console.log(isNewDate, msgObj)
                displayDate(isNewDate, msgObj.date.split(' ')[0])
            }

        })
        initSocket(message, room, host)
    } catch {
        initMsgs.forEach(txt => {
            displayMsg({ message: txt }, "others")
        })
    }
}


const displayDate = (isNewDate, date) => {
    let messagesContainer = document.getElementById('messages-container')
    let myDate = document.createElement("span")
    let dateParams = date.split('/')
    console.log(dateParams)
    const today = new Date()

    console.log(today.getFullYear() == dateParams[2])
    console.log(today.getMonth() + 1 == dateParams[1])
    console.log(today.getDate() == dateParams[0])
    myDate.innerText = date
    if (today.getFullYear() == dateParams[2]) {
        console.log(1)
        if ((today.getMonth() + 1) == dateParams[1]) {
            console.log(2)
            if (today.getDate() == dateParams[0]) {
                myDate.innerText = "Today"
            }
        }
    }
    myDate.className = 'new-date'
    if (isNewDate)
        messagesContainer.appendChild(myDate)
}


const initSocket = (msg, room, host) => {
    socket = io('http://localhost:2000', { query: `room=${room}&host=${host}` })
    socket.on('connect', () => {
        displayMsg(msg, 'others')
        socket.on('receive-msg', (room, message) => {
            console.log("Message Received")
            const temp = message.from === clientID ? "my" : "others"
            if (temp === "others")
                displayMsg(message, temp)
        })
        socket.on('crm-typing', (isTyping, name) => {
            toggleTypingMsg(isTyping, name)
        })
        socket.emit('join-room', room, message => {
            //displayMsg(message, 'others')
            socket.emit('notify-host', host, room)
        })
    })
    document.getElementById('send-button').onclick = (e) => onSend(e)
}
function GetFormattedDate() {
    var todayTime = new Date();
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var hour = todayTime.getHours();
    var minutes = todayTime.getMinutes();
    return day + "/" + month + "/" + year + " " + hour + ":" + minutes;
}

const onSend = async (e) => {
    e.preventDefault()
    console.log("Saved Room: ", savedRoom)
    const msg = document.getElementById('message-input').value
    socket.emit('send-msg', msg, savedRoom, clientID, workerID)
    displayMsg({ message: msg, date: GetFormattedDate() }, "my")
}

const onTyping = async () => {
    if (clientID) {
        clearTimeout(timeOutEvent)
        if (!clientTyping) {
            clientTyping = true
            socket.emit('typing', savedRoom, true, "client")
        }
        timeOutEvent = setTimeout(() => {
            clientTyping = false
            socket.emit('typing', savedRoom, false, "client")
        }, 800);
    }
}

let email = ""
const verify = async (e) => {
    e.preventDefault()
    let emailAndName = document.getElementById('message-input').value
    displayMsg({ message: emailAndName }, "my")
    if (email === "") {
        temp = displayMsg({ message: "Please Enter Your First Name" }, "others")
        email = emailAndName
    }
    else {
        try {
            const req = await axios.post('http://localhost:8082/verify/',
                { email, name: emailAndName, companyName: "The Wedding Planners" })
            const { room, msg, host, worker, client } = req.data
            myStorage.setItem('info',
                JSON.stringify({ room, msg, host, worker, client }))
            workerID = worker
            clientID = client
            savedRoom = room
            initSocket(msg, room, host)
        }
        catch (err) {
        }
    }
}

const toggleTypingMsg = (isTyping, name) => {
    let messagesContainer = document.getElementById('upper-border')
    typingElm.innerText = `${name} is Typing..`
    if (isTyping)
        messagesContainer.appendChild(typingElm)
    else
        messagesContainer.removeChild(typingElm)
}


const displayMsg = (messageObj, side) => {
    let messagesContainer = document.getElementById('messages-container')
    let msg
    if (side === "others") {
        msg = messageObj.message
    }
    else {
        let msgInput = document.getElementById('message-input')
        if (msgInput.value !== "") {
            msg = msgInput.value
            msgInput.value = ""
        } else {
            msg = messageObj.message
            console.log("Taking message")
        }
    }
    console.log(messageObj)
    let div = document.createElement("div")
    let myElm = document.createElement("span")
    let dateElm = document.createElement("span")
    div.className = `${side}-msg-container`
    if (msg) {
        myElm.innerText = msg
        myElm.className = `${side}-msg`
    }
    if (messageObj.date) {
        messagesContainer.appendChild(div)
        div.appendChild(myElm)
        const dateParams = messageObj.date.split(' ')
        dateElm.innerText = dateParams[1]
        dateElm.className = `${side}-date`
        div.appendChild(dateElm)
    } else {
        messagesContainer.appendChild(myElm)
        myElm.className = `${side}-msg-container`

    }
}