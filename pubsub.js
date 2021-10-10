const PubNub = require('pubnub');

const credentials = {

    publishKey: 'publishKey',
    subscribeKey: 'subscribeKey',
    secretKey: 'secretKey'

    };

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;

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
        this.pubnub.unsubscribe(channel, () => {
            this.pubnub.publish({ channel, message }, () => {
                this.pubnub.subscribe(channel);
            })  // publishes the message to a channel
        })
    }

    handleMessage(channel, message){
        console.log(`Message received. Channel: ${channel}. Message: ${message}.`);

        const parsedMessaage = JSON.parse(message);

        if(channel === CHANNELS.BLOCKCHAIN){
            this.blockchain.replaceChain(parsedMessage); 
        }
    }

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}

module.exports=PubSub;