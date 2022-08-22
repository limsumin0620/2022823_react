const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '192.168.1.180',
    database: 'postgres',
    password: 'gangseo_mng',
    port: '4326'
});

client.connect();

const getList = (req, res)=> {
    client.query('SELECT count(*) FROM public.cmm_sys_menu', (err, data) => {
        if (err) {
            throw err
          }
          res.status(200).json(data.rows)
          console.log(data);
    });
}

module.exports = {
    getList
}