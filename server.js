var express  = require('express');
// cria nossa aplicação Express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// solicitações para log no console (express4)
var morgan = require('morgan');
// puxar informações por POST HTML (express4)
var bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
var methodOverride = require('method-override');

var cors = require('cors')

// definindo local de arquivos públicos
app.use(express.static(__dirname + '/dist'));

// logando todas as requisições no console
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended': false}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//Liberamos permissão de requisições que venham de domínios diferentes
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// start up the server
// conectando ao mongodb no localhost, criando o banco de dados Politicos
mongoose.connect('mongodb://localhost:27017/bravi',{
        useNewUrlParser: true,
    }).then(() => { 
        startServer();
        return mongoose.connection 
    }, err => { 
        console.log(err) 
    });

// Caso haja erro ao se conectar emite um log

function startServer(){
	// Define a porta 8080 onde será executada nossa aplicação
	var server = app.listen(27017, function(){
		var port = server.address().port;
		// Imprime uma mensagem no console na porta em que a aplicação está rodando
		console.log("Aplicação executada na porta: "+port);
	});
};

// Requisição ao arquivo que cria nosso model Contatos
require('./models/Contacts');

// Incluindo nossas rotas definidas no arquivo routes/index.js
var Contacts = require('./server/routes/api');
// definindo nossas rotas na aplicação
app.use('/', Contacts);