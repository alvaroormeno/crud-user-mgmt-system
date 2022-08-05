const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// View Users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId); 

        // Use the connection - query to view all users that only have active status in database user table
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            // When done with the connection, release it
            connection.release()

            if(!err) {
                res.render('home', {rows});
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows)
        });
    })
};

// Find user by Search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId); 

        // grab value of search box
        let searchTerm =  req.body.search;


        // Use the connection - query to view all users that only have active status in database user table
        connection.query('SELECT * FROM user WHERE status = "active" AND first_name LIKE ? OR last_name LIKE ? ', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it
            connection.release()

            if(!err) {
                res.render('home', {rows});
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows)
        });
    })
};

exports.form = (req, res) => {
    res.render('add-user');
}



// Add new user
exports.create = (req, res) => {

    // destrcuture data from request body
    const {first_name, last_name, email, phone, comments} = req.body;

    // res.render('add-user')   
        pool.getConnection((err, connection) => {
            if(err) throw err; //not connected!
            console.log('Connected as ID' + connection.threadId); 
    
            // grab value of search box
            let searchTerm =  req.body.search;
    
    
            // Use the connection - query to view all users that only have active status in database user table
            connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
                // When done with the connection, release it
                connection.release()
    
                if(!err) {
                    res.render('add-user', {alert: 'user added successfuly!'});
                } else {
                    console.log(err);
                }
    
                console.log('The data from user table: \n', rows)
            });
        })
    
};

// Edit User
exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId); 

        // Use the connection - query to view all users that only have active status in database user table
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release()

            if(!err) {
                res.render('edit-user', {rows});
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows)
        });
    })
    

}

// Update User
exports.update = (req, res) => {

    const {first_name, last_name, email, phone, comments} = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + connection.threadId); 

        // Use the connection - query to view all users that only have active status in database user table
        connection.query('UPDATE user SET first_name = ?, last_name = ? WHERE id = ? ', [first_name, last_name, req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release()

            if(!err) {
                pool.getConnection((err, connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + connection.threadId); 
            
                    // Use the connection - query to view all users that only have active status in database user table
                    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                        // When done with the connection, release it
                        connection.release()
            
                        if(!err) {
                            res.render('edit-user', {rows});
                        } else {
                            console.log(err);
                        }
            
                        console.log('The data from user table: \n', rows)
                    });
                })
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows)
        });
    })
    

}