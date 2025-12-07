const router = require('./fuse/routing');
const NPLoad = require('./controllers/NPLoad')
const NPAdmin = require('./controllers/NPAdmin');
const NPInstall = require('./controllers/NPInstall');

/* 

Admin Routes

*/

const adminURL = global.__env.ADMIN_URL;

router.get(`/${adminURL}/install`, NPInstall.index)

router.post(`/${adminURL}/np-ajax`, NPAdmin.index );

router.post(`/np-ajax`, NPAdmin.noPrivAjax );
router.get(`/np-ajax`, NPAdmin.noPrivAjax );

router.get(`/${adminURL}`, NPAdmin.index)

router.get(`/${adminURL}/[param1]`, NPAdmin.index)

router.get(`/${adminURL}/[param1]/[param2]`, NPAdmin.index)

router.get(`/${adminURL}/[param1]/[param2]/[param3]`, NPAdmin.index)

router.get(`/login`, NPAdmin.login)
router.post(`/login`, NPAdmin.login)
 


/*
Load site
*/

router.get('/',NPLoad.init);
router.get('/[urlParam1]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]/[urlParam4]',NPLoad.init)
router.get('/[urlParam1]/[urlParam2]/[urlParam3]/[urlParam4]/[urlParam5]',NPLoad.init)



