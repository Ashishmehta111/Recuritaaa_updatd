var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var mysql = require('mysql');
var session = require('express-session');


var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "recruit"
})

con.connect(function(err){
    console.log("connected");
})
app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));

app.get('/index', function(req, res) {
  res.render('index');
});

app.get('/login', function(req, res) {
  res.render('Log_in');
});

app.get('/search', function(req, res) {
  res.render('search');
});

app.get('/forget',function(req,res){
  res.render('forget');
});

app.get('/update',function(req,res){
  res.render('update');
});

app.post('/logindata',function(req,res){
  if(req.body.recruit === 'recruiter')
  {
    var sql="select email,password from recruiter where email='"+req.body.email+"' and password='"+req.body.password+"' ";
    con.query(sql,function(err,result)
    {
        if(err) throw err;
        if(result.length>0){
            res.render('search');
        }
        else{
            res.render('error');
        }
  
    });
  }
  else{
  var sql="select email,password from register where email='"+req.body.email+"' and password='"+req.body.password+"' ";
  con.query(sql,function(err,result)
  {
      if(err) throw err;
      if(result.length>0){
          res.render();
      }
      else{
          res.render('error');
      }

  });
}
});


app.post('/registerdata',function(req,res){
   

  if(req.body.recruit === 'recruiter')
  {
    var sql="insert into recruiter values('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')";
    con.query(sql,function(err)
    {
        if(err) throw err;
        console.log("1 record inserted");
    });
  }

  else{
  var sql="insert into register values('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')";
  con.query(sql,function(err)
  {
      if(err) throw err;
      console.log("1 record inserted");
  });
}
});


app.post('/updatedata',function(req,res){

     if(req.body.recruit=='recruiter')
     {
        var sql="update recruiter set password='"+req.body.newpassword+"' where email='"+req.body.email+"' ";
        con.query(sql,function(err,result){
          if (err) throw err;
          if(result.affectedRows > 0)
          { 
            console.log('password updated'); 
            res.redirect('/login');
        }
          else{
            console.log("email not found");
            res.send('email not found'); 
          
          }
          
      });
    
     }
     else
     {
        var sql="update register set password='"+req.body.newpassword+"' where email='"+req.body.email+"' ";
        con.query(sql,function(err,result){
          if (err) throw err;
          if(result.affectedRows > 0)
          { 
            console.log('password updated'); 
            res.redirect('/login');
        }
          else{
            console.log("email not found");
            res.send('email not found'); 
          
          }
          
    });
  }
    

});

app.listen(3000);


