// Model Contatos
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Contatos
var ContactsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  whatsapp: String
});
 
//Define o model Contatos
mongoose.model('Contacts', ContactsSchema);