var express = require('express');
var router = express.Router();

var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');
var ctrlUsers = require('../controllers/users');
var ctrlBadges = require('../controllers/badge');
var ctrlBooks = require('../controllers/books');
var ctrlKids = require('../controllers/kids');
var ctrlQuestions = require('../controllers/questions');



// users 
router.post('/users/register', ctrlAuth.register);
router.post('/users/login', ctrlAuth.login);
router.get('/users/:userid', ctrlUsers.getUser );
router.get('/users', ctrlUsers.getAllUsers );
router.put('/users/update/:userid', ctrlUsers.updateUser);
router.put('/users/:userid/badges/:badgeid', ctrlUsers.addBadge);
router.get('/users/:userid/badges', ctrlUsers.getBadges);


// badges
router.post('/badges', ctrlBadges.addBadge);
router.get('/badges', ctrlBadges.getAllBadges);
router.get('/badges/:badgeid', ctrlBadges.getOneBadge);
router.put('/badges/:badgeid', ctrlBadges.updateBadge);
router.delete('/badges/:badgeid', ctrlBadges.removeBadge);


// books
router.post('/books/:userid', ctrlBooks.addBook);
router.get('/books', ctrlBooks.getAllBooks);
router.get('/books/:bookid', ctrlBooks.getOneBook);
router.put('/books/:bookid', ctrlBooks.updateBook);
router.delete('/books/:bookid', ctrlBooks.removeBook);

//kids
router.post('/kids', ctrlKids.addKid);
router.get('/kids', ctrlKids.getAllKids);
router.get('/kids/:kidid', ctrlKids.getOneKid);
router.put('/kids/:kidid', ctrlKids.updateKid);
router.delete('/kids/:kidid', ctrlKids.removeKid);

//questions
router.post('/questions/:userid/:bookid', ctrlQuestions.addQuestion);
router.get('/questions', ctrlQuestions.getAllQuestions);
router.get('/questions/:bookid',ctrlQuestions.getQuestionsByBook);
module.exports = router;
