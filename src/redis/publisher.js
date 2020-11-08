const redis = require('redis');


exports.publishUserRequestEvent = async (user) => {
    const publisher = redis.createClient();
    const user_info = {
        user: user
    }

    publisher.publish("user-info-received", JSON.stringify(user_info));
    return;
}