const PubNub = require('pubnub');

const credentials = {

    publishKey: 'publishKey',
    subscribeKey: 'subscribeKey',
    secretKey: 'secretKey'

    };

const CHANNELS = {
    TEST: 'TEST'
};

class PubSub{
    constructor(){
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: [Object.values(CHANNELS)] });  // subscribes to the channel/s

        this.pubnub.addListener(this.listener());
    }

    listener(){
        return {  // listens for the message events
            message: messageObject => {
                const { channel, message } = messageObject;    // gets the channel from where the message if coming along with the message

                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
            }
        };
    }

    publish({ channel, message }){
        this.pubnub.publish({ channel, message })  // publishes the message to a channel
    }
}

module.exports=PubSub;
