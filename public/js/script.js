var allMessages;
var message;
var userName;
var userMessage;
var userCompany;
var time;
var timestampMessage;

$(window).on('load', function() {

	//manipulating buttons
    $('.button--close, .button--minimize, .button--maximize').on('click', function(e) {
        _this = $(this);
        if (_this.hasClass('button--close')) {
            closeChat(e);
        } else if (_this.hasClass('button--minimize')) {
            minimizeChat(e);
        } else {
            maximizeChat(e);
        }

    });

    //close chat
    function closeChat(e) {
        e.preventDefault();
        $('.content__chat').hide();
    }

    //minimize chat
    function minimizeChat(e) {
        e.preventDefault();
        $('.content__chat').css('height', 38);
        $('.button--maximize').css('display', 'inline-block');

        setTimeout(function() {
            $('.chat__messages, .chat__writeMessage, .button--minimize').hide();
        }, 50)
    }

    //maximize chat
    function maximizeChat(e) {
        e.preventDefault();
        $('.chat__messages, .chat__writeMessage, .button--minimize').show();
        $('.content__chat').css('height', 543);
        $('.button--maximize').hide();
    }

    //get list messages
    $.getJSON("/static/json/talk.json", function(data) {
        getAllMessages(data);
    });



    //list messages
    function getAllMessages(data) {
        allMessages = data.talkMessages;

        for (i = 0; i < allMessages.length; i++) {
            getMessage(allMessages[i]);
        }
    }



    //read a message
    function getMessage(message) {
        message = message;

        if (message.company) {
            userCompany = message.company.name;
        } else {
            userCompany = null;
        }

        userId = message.user.id;
        userName = message.user.name;
        userMessage = message.message.message;
        readMessage = message.message.alreadyRead;

        timestampMessage = message.message.time;


	     writeMessagesOnChat(userId, userName, userMessage, userCompany, timestampMessage, readMessage);

    }



    //write messages on chat
    function writeMessagesOnChat(userId, userName, userMessage, userCompany, timestampMessage, readMessage) {
        

        //get image avatar
        var name = userName.split(' ');
        var image = '/static/img/' + name[0] + '.jpg';

        
        //convert timestamp to hours
        time = new Date(timestampMessage * 1000).toString().match(/(\d{2}:\d{2})/);;
        formatTime = time[0].split(':');
        hours = formatTime[0];
        minutes = formatTime[1];


        //building a message
        var divMessage = $('<div/>').addClass('message');
        var textMessage = $('<p/>').addClass('message__text').text(userMessage);
        var avatar = $('<img/>').attr('src', image).addClass('message__avatar');
        var messageUserName = $('<span/>').addClass('message__user').text(userName);
        var timeStamp = $('<span/>').addClass('message__time').text('enviado às ' + hours + 'h' + minutes);

        if (userCompany != null) {
            textMessage.addClass('message--company');
            var company = $('<span/>').addClass('message__company').html('<strong>' + userCompany + '</strong>');
        }


        textMessage.append(messageUserName, company, timeStamp);

        //defines disposition of messages
        if (userId % 3 != 0) {
            avatar.addClass('message--right');
            textMessage.addClass('message--left');

            //checking reading
            if (readMessage) {
                textMessage.addClass('message--read');
            } else {
                textMessage.addClass('message--unread');
            }


        } else {
            avatar.addClass('message--left');
            textMessage.addClass('message--right');
        }

        divMessage.append(avatar, textMessage);
        $('.chat__messages').append(divMessage);
    }

    //event to send a new message
    $(".chat__boxMessage").keypress(function(e) {
    	if(e.which == 13){
    		newMessage = $(this).val();
    		sendNewMessage(newMessage);
    		$(this).val(' ');

    		$('html,body').animate({
        scrollTop: $(".chat__messages").offset().top},
        'slow');
      	 }
    });


    //send new message
    function sendNewMessage(message) {
    	
        userId = 9483484;
        userName = 'Nome do Candidato';
        userMessage = message;
        userCompany = null;
        date = new Date();
        time = date.getTime()/1000;
        readMessage = false;

        writeMessagesOnChat(userId, userName, userMessage, userCompany, time, readMessage)

        $('.chat__boxMessage').empty();
    }
});
