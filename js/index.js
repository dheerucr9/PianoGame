const cors = require('cors');
const express = require('express');
const port = 3000
const fs = require('fs')
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());


app.post('/game1', (req, res) => {
        var id = req.body.id;
        var corr_incorr_array = req.body.corr_incorr_array;
        var reactionTimes_array = req.body.reactionTimes_array;
        var cycles = req.body.cycles;
        var date = new Date().getTime();
        var fileName = "Game1/" + id + date + ".txt";
        var data = id + "\n" + corr_incorr_array + "\n" + reactionTimes_array + "\n" + cycles;
        fs.writeFile( fileName, data, (err, data) => {
                var x = 4;
        });
});

app.post('/game2', (req, res) => {
        var id = req.body.id;
        var corr_incorr_array = req.body.corr_incorr_array;
        var reactionTimes_array = req.body.reactionTimes_array;
        var cycles = req.body.cycles;
        var date = new Date().getTime();
        var fileName = "Game2/" + id + date + ".txt";
        var data = id + "\n" + corr_incorr_array + "\n" + reactionTimes_array + "\n" + cycles;
        fs.writeFile( fileName, data, (err, data) => {
                var x = 4;
        });
});

app.post('/game3', (req, res) => {
        var id = req.body.id;
        var corr_incorr_array = req.body.corr_incorr_array;
        var reactionTimes_array = req.body.reactionTimes_array;
        var cycles = req.body.cycles;
        var date = new Date().getTime();
        var fileName = "Game3/" + id + date + ".txt";
        var data = id + "\n" + corr_incorr_array + "\n" + reactionTimes_array + "\n" + cycles;
        fs.writeFile( fileName, data, (err, data) => {
                var x = 4;
        });
});

app.post('/game4', (req, res) => {
        var id = req.body.id;
        var corr_incorr_array = req.body.corr_incorr_array;
        var reactionTimes_array = req.body.reactionTimes_array;
        var cycles = req.body.cycles;
        var date = new Date().getTime();
        var fileName = "Game4/" + id + date + ".txt";
        var data = id + "\n" + corr_incorr_array + "\n" + reactionTimes_array + "\n" + cycles;
        fs.writeFile( fileName, data, (err, data) => {
                var x = 4;
        });
});
app.listen(port)
