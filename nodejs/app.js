var express = require('express');
var path = require('path');
var connection  = require('./connection.js');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));


//SHOW ALL USERS
app.get('/', function(req, res) {
	 	connection.query('SELECT * FROM users',function(err,rows){
            res.render('index',{
            	title:"User details",
            	data:rows
            });                   
        });    
});


//CREATE USER 
app.get('/create', function(req, res){    
    	res.render('insert', {
        	title: 'Create User'     
    	});
});

//CREATE USER POST 
app.post('/add', function(req, res){
 		connection.query('INSERT INTO users SET Name = ?, Surname = ?, Email = ?', [req.body.name, req.body.surname, req.body.email] , function(err, rows) {
            res.redirect('/');
        });
});
 

//UPDATE USER
app.get('/edit/:id', function(req, res){
		connection.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows) {
                res.render('update', {
                    title: 'Update Users', 
                    id: rows[0].ID,
                    name: rows[0].Name,
                    surname: rows[0].Surname,
                    email: rows[0].Email                    
                });  
		});
});

//UPDATE USER POST 
app.post('/update/:id', function(req, res){
 		connection.query('UPDATE users SET Name = ?, Surname = ?, Email = ? WHERE ID = ?', [req.body.name, req.body.surname, req.body.email,  req.params.id],   function(err, rows) {     
                    res.redirect('/');
        });
});


//DELETE USER  
app.get('/delete/:id', function(req, res){
      	res.render('delete', {
      		title: 'Delete Users', 
      		id: req.params.id
      	});
});

//DELETE USER POST
app.post('/remove/(:id)', function(req, res){
     	connection.query('DELETE FROM users WHERE id = ' + req.params.id, function(err, rows) {
             res.redirect('/');
        });
});



app.listen(3000);


