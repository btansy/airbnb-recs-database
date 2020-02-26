const { Pool } = require('pg');

var db = {};

db.pageload = function(primary_list_id, user_id, callback) {
    var pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'sdc',
      password: 'postgres',
      port: 5432,
    })
    pool.query(`SELECT * FROM recommendations, listings, opinions, images WHERE recommendations.primary_list_id = listings.id AND opinions.listing_id = listings.id AND images.list_id = listings.id AND recommendations.primary_list_id = ${primary_list_id} LIMIT 10`, (err, res) => {
      if (err) {
        callback(err, null);
        pool.end();
      } else {
        callback(null, res);
        pool.end();
      }
    })
}

module.exports = db;