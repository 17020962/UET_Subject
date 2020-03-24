var express = require('express');
var router = express.Router();
const axios = require('axios');
var CircularJSON = require('circular-json');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var GetDataSubjectController = require('./getDataSubject');
var getDataSubject = new GetDataSubjectController();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// get data subject from url

router.get('/get-data-subject', getDataSubject.allSubject);
router.post('/get-data-subject-from-mssv',getDataSubject.subjectStudent);

module.exports = router;
