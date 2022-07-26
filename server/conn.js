const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: '5432'
});

function GetUserList() {
    client.connect();
    client.query('select * from test_member', (err, res) => {
        console.log(res);
        client.end();
    });
};
 
module.exports = {
    getUserList: GetUserList
}
