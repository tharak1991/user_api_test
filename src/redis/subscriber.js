const redis = require('redis');
const user_controller = require('./../controllers/user.controller');
const redis_publisher = require('./publisher');



exports.subscribeUserInfoReq = async() => {
    const subscriber = redis.createClient();

    subscriber.on("message", (channel, message) => {
        console.log("Received user id :" + message);
        const user = JSON.parse(message);

        if (user) {
            const user_info =  user_controller.getById(user.id).then((user_info) =>{
                redis_publisher.publishUserRequestEvent(user_info);
                console.log('user_info', user_info );

            }

            ).catch(error => console.log(error));
           
            // if(user_info){
            //     redis_publisher.publishUserRequestEvent(user_info);
            // }
            
        }
})

    subscriber.subscribe("user-notify");
}