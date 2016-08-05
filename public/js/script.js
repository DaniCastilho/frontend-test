var allMessages;
var message;
var userName;
var userMessage;
var userCompany;
var time;
var timestampMessage;

$(function() {


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


    function closeChat(e) {
        e.preventDefault();
        $('.content__chat').hide();
    }

    function minimizeChat(e) {
        e.preventDefault();
        $('.content__chat').css('height', 38);
        $('.button--maximize').css('display', 'inline-block');

        setTimeout(function() {
            $('.chat__messages, .chat__writeMessage, .button--minimize').hide();
        }, 50)
    }

    function maximizeChat(e) {
        e.preventDefault();
        $('.chat__messages, .chat__writeMessage, .button--minimize').show();
        $('.content__chat').css('height', 543);
        $('.button--maximize').hide();
    }


    $.getJSON("/static/json/talk.json", function(data) {
        getAllMessages(data);
    });



    function getAllMessages(data) {
        allMessages = data.talkMessages;

        for (i = 0; i < allMessages.length; i++) {
            getMessage(allMessages[i]);
        }
    }




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




    function writeMessagesOnChat(userId, userName, userMessage, userCompany, timestampMessage, readMessage) {
        var divMessage = $('<div/>').addClass('message');
        var name = userName.split(' ');
        var image = '/static/img/' + name[0] + '.jpg';
        var textMessage = $('<p/>').addClass('message__text').text(userMessage);
        var avatar = $('<img/>').attr('src', image).addClass('message__avatar');
        var messageUserName = $('<span/>').addClass('message__user').text(userName);

        time = new Date(timestampMessage * 1000).toString().match(/(\d{2}:\d{2})/);;
        formatTime = time[0].split(':');
        hours = formatTime[0];
        minutes = formatTime[1];

        console.log(time)
        if (minutes.length < 2){
        	
            time = hours + 'h' + minutes;
        }
        else {
            time = hours + 'h' + minutes;
        }

        var timeStamp = $('<span/>').addClass('message__time').text('enviado às' + time);
        if (userCompany != null) {
            textMessage.addClass('message--company');
            var company = $('<span/>').addClass('message__company').html('<strong>' + userCompany + '</strong>');
        }


        textMessage.append(messageUserName, company, timeStamp);

        //definindo disposição das mensagens
        if (userId % 3 != 0) {
            avatar.addClass('message--right');
            textMessage.addClass('message--left');

            //confirmacao de leitura
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

    $(".chat__boxMessage").keypress(function(e) {
    	if(e.which == 13){
    		newMessage = $(this).val();
    		sendNewMessage(newMessage);
    		$(this).val($(this).data('placeholder'));
      	 }
    });

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
})
