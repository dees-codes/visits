const express = require('express')
const redis = require('redis')
const process = require('process')

const app = express();
// Docker sees it's trying to make connection to a host, retrieves what that implies from docker compose and applies the value to host to establish connection.
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

client.set('visits', 0);

app.get('/', (req, res) =>{
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        if (visits == 10) process.exit(0);
        client.set('visits', parseInt(visits) + 1);
    })
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});