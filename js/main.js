var pseudo = "";
var botName = "Chatbot";
var id="";
var id2="";
var id3="";
var id4="";
var id5="";

// send the message to user
function sendMessage(message){
  var previousMessage = $(".chatContainer").html();
  previousMessage = previousMessage + "<br>";

  $(".chatContainer").html(previousMessage + "<span class='bot'>"+botName+": </span>" + message);
}

// get the username
function getUsername(){
    sendMessage("Hi ! what is your name ?");
}

function tooShy(){
  $("#threeDots").hide();
  sendMessage("Did you left or are you too shy to speak ?");
  id4=setTimeout(showDots,1000);
  id3=setTimeout(subject,3000);
}

function subject(){
  $("#threeDots").hide();
  sendMessage("Maybe you could ask me about time or weather or something else..");
  id4=setTimeout(showDots,18000);
  id5=setTimeout(userLeft,20000);
}

function showDots(){
    $("#threeDots").show();
}

function userLeft(){
  $("#threeDots").hide();
  sendMessage("Well... It seems you left me alone, cya ! You can talk me whenever you want &#9786;")
}
//
function sendUserMessage(message){
  $("#threeDots").hide();

  if ((message.indexOf("sorry")>=0) || (message.indexOf("sry")>=0)){
    sendMessage("Sorry for what ? There is no reason to be sorry don't worry &#9786;")
  }

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

  if (message.indexOf("time") >= 0){
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    sendMessage("It's " + hour + ":" + minutes + ". Is there a better time to talk ?");
  }

  id4=setTimeout(showDots,14000);
  id2=setTimeout(tooShy,16000);
}


// main JQuery function
$(document).ready(function(){

  getUsername();
  $("#threeDots").hide();
  $("#userText").keypress(function(event){
    if (event.which == 13) {
      if ($("#enter").prop("checked")){
        $("#sendButton").click();
        event.preventDefault();
      }
    }
  });

  $("#sendButton").click(function(){
    clearTimeout(id2);
    clearTimeout(id4);
    clearTimeout(id5);
    var username = "<span class='username'>You: </span>"
    var userMessage = $("#userText").val();
    $("#userText").val("");
      //store the first userMessage
    var previousMessage = $(".chatContainer").html();
    previousMessage = previousMessage + "<br>"
    userMessage = userMessage.replace(/:\)/g,"&#9786;");
    userMessage = userMessage.replace(/:\(/g,"&#9785;");
    userMessage = userMessage.replace(/:heart:/g,"&#9825;");
    userMessage = userMessage.replace(/:coffee:/g,"&#9749;");

    //show the userMessage to the chatContainer div
    $(".chatContainer").html(previousMessage + username + userMessage);

    $(".chatContainer").scrollTop($(".chatContainer").prop("scrollHeight"));

    id4=setTimeout(showDots,1000);
    id=setTimeout(function(){sendUserMessage(userMessage)},3000);
  });

});
