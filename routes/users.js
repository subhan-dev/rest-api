const router = require('express').Router();

const { 
  createUser, 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  sendPdf,
  getUUID,
  loadData,
  curl
} = require('../controllers/UserController')
const { signUp, signIn } = require('../controllers/AuthController');
const auth = require('../middleware/auth');

// sign in to get access token limit 1 hour
router.post('/signup', signUp);
router.post('/signin', signIn);

// router.post('/create', auth.isAuth, auth.isAuthorized, createUser);
router.get('/read', auth.isAuth, getUsers);
router.get('/read/:id', auth.isAuth, getUser);
router.patch('/update/:id', auth.isAuth, updateUser);
router.delete('/delete/:id', auth.isAuth, deleteUser);

//send pdf to third party
router.post('/pdf', sendPdf);

//create uuid
router.get('/uuid', getUUID);

//load-data with limit
router.get('/load', loadData);

//curl get data from api raja ongkir
router.get('/curl', curl);

module.exports = router;