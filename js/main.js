//used for first user nickname
var pseudo = "";
//used cause we want to give the bot a new name after a certain question
var botName = "Chatbot";
//our different setTimeout
var id="";
var id2="";
var id3="";
var id4="";
var id5="";

// send the message to user
function sendMessage(message){
  var previousMessage = $(".chatContainer").html();
  //adding the next message with a br to simulate a chat
  previousMessage = previousMessage + "<br>";

  //adding the bot name before his message
  $(".chatContainer").html(previousMessage + "<span class='bot'>"+botName+": </span>" + message);
}

// getting the user nickname at start
function getUsername(){
    sendMessage("Hi ! what is your name ?");
}

//here are the main answer function where we compare some part of the user message to give a "correct" answer
function sendUserMessage(message){
  $("#threeDots").hide();

  //all messages are displayed in the same way with indexOf
  //(if indeOf our message return something >= it means that there is this word in the user string and so we give him an answer base on this)
  if ((message.indexOf("sorry")>=0) || (message.indexOf("sry")>=0)){
    sendMessage("Sorry for what ? There is no reason to be sorry don't worry &#9786;")
  }

  //just in case the user give a nickname too short, we don't avoid numbers cause people usually put numbers in their nickname
  if (pseudo.length < 3){
    if(message.length <3){
      sendMessage("Excuse me, what's your real name ?")
    }
    else{
      pseudo = message;
      sendMessage("Hi, nice to meet you " + pseudo + " ! How are you doing ? ")
    }
  }

  if ((message.indexOf("fine and you") >= 0) || (message.indexOf("how are you") >= 0) || (message.indexOf("about you") >= 0)){
    sendMessage("I am okay, thanks for asking " + pseudo);
  }

  //special message where we change the chatbot name only if the user ask the name of the chatbot
  if ((message.indexOf("name") >= 0)){
    botName="Samantha";
    sendMessage("My name is Samantha ! I'm glad you asked !");
  }

  if ((message.indexOf("chatbot")>=0) || (message.indexOf("Chatbot")>=0)){
    sendMessage("I don't know why HE call me like that, i'm a real person afterall !")
  }

  if ((message.indexOf("old")>= 0) || (message.indexOf("age")>= 0)){
    sendMessage("I can't remember how old i am.. But is that really important ?");
  }

  //basic display time
  if (message.indexOf("time") >= 0){
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    sendMessage("It's " + hour + ":" + minutes + ". Is there a better time to talk ?");
  }

  //these timeout are only if the user stop speaking with the bot, it will launch function where the bot "speaks alone"
  id4=setTimeout(showDots,14000);
  id2=setTimeout(tooShy,16000);
}

//first function is case of the user dont speak during a certain time
function tooShy(){
  //hiding the dots simulating the writing time of the bot
  $("#threeDots").hide();
  sendMessage("Did you left or are you too shy to speak ?");
  //setting delay on eventual next message if the user is still quiet
  id4=setTimeout(showDots,1000);
  id3=setTimeout(subject,3000);
}
//function which is proposing some subject to the user
function subject(){
  $("#threeDots").hide();
  sendMessage("Maybe you could ask me about time or weather or something else..");
  //in case the user is "completly" afk
  id4=setTimeout(showDots,18000);
  id5=setTimeout(userLeft,20000);
}

//used to show dots latency after a certain delay
function showDots(){
    $("#threeDots").show();
}

//used when the user is afk after 35s
function userLeft(){
  $("#threeDots").hide();
  sendMessage("Well... It seems you left me alone, cya ! You can talk me whenever you want &#9786;")
}


// main JQuery function
$(document).ready(function(){

  //starting the bot with this function
  getUsername();
  $("#threeDots").hide();

  //function permitting user to send a message with his "enter" key (the send button is still functionnal)
  $("#userText").keypress(function(event){
    if (event.which == 13) {
      if ($("#enter").prop("checked")){
        $("#sendButton").click();
        event.preventDefault();
      }
    }
  });

  //basic function for sending the user message "in" the chatbox and to interact with the bot
  $("#sendButton").click(function(){
    //avoiding different afk messages
    clearTimeout(id2);
    clearTimeout(id4);
    clearTimeout(id5);
    //display You before usermessage
    var username = "<span class='username'>You: </span>"
    //getting the userMessage and we display "" for the next message
    var userMessage = $("#userText").val();
    $("#userText").val("");
    //going to the next line for displaying the new message
    var previousMessage = $(".chatContainer").html();
    previousMessage = previousMessage + "<br>"

    //4 differents emojis automaticly replaced with their html value
    userMessage = userMessage.replace(/:\)/g,"&#9786;");
    userMessage = userMessage.replace(/:\(/g,"&#9785;");
    userMessage = userMessage.replace(/:heart:/g,"&#9825;");
    userMessage = userMessage.replace(/:coffee:/g,"&#9749;");

    //show the userMessage in the chatbox
    $(".chatContainer").html(previousMessage + username + userMessage);

    //timeout for the bot answer
    id4=setTimeout(showDots,1000);
    id=setTimeout(function(){sendUserMessage(userMessage)},3000);
  });

});
