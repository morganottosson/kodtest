const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.log("Error " + err);
});

exports.getPlayer = (player) => {
    return new Promise((resolve,reject) => {
        client.hgetall(`${player}`, (err, reply) => {
            if (err)
                return reject(err)
            else {
                resolve(
                    reply
                );
            }
        })
    })
}

exports.savePlayer = (name) => {
    const rating = 1000;
    const active = false;
    const player = {name, rating, active}

    return new Promise((resolve,reject) => {
        client.hmset(name, player, (err, reply) => {
            if (err)
                return reject(err)
            else {
                resolve(
                    reply
                );
            }
        })
    })
}
