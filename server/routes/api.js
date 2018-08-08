// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Contacts = mongoose.model('Contacts');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

// ROTA BUSCAR ============================================
router.get('/api/Contacts', function(req, res) {
    Contacts.find(function(err, list) {
        if (err){
            res.send(err)
        }
        res.json(list);
    });
});

 
// ROTA CRIAR =============================================
router.post('/api/Contacts', jsonParser, function(req, res) {
    Contacts.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        whatsapp: req.body.whatsapp,
    }, function(err, list) {
        if (err){
            res.send(err);
        }
        res.status(200).json(list);
    });
 
});
 
// ROTA DELETAR ============================================
router.delete('/api/Contacts/:id', function(req, res) {
    Contacts.remove({
        _id : req.params.id
    }, function(err, list) {
        if (err){
            res.send(err);
        }
        res.json(list);
    });
});
 
// ROTA EDITAR ==================================================
router.put('/api/Contacts/:id', function(req, res) {
    Contacts.findByIdAndUpdate(req.params.id, req.body, function (err, list) {
        if (err) return next(err);
        res.json(list);
    });
});

module.exports = router;