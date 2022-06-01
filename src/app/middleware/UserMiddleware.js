const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {


    const token = req.cookies.jwt;

    // check json webtoken exists & is verified
    if(token)   {
        jwt.verify(token, 'tuannt', (err, decodedToken) => {
            if(err) {
                res.redirect('user/sign_in');
            } else {
                next();
            }
        })
    }   
    else    {
        res.redirect('/user/sign_in');
    }
}

// check current user
const checkUser = (req, res, next) =>   {
    const token = req.cookies.jwt;
    if(token)   {
        jwt.verify(token, 'tuannt', async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else    {
        res.locals.user = null;
        next();
    }


}


module.exports = { requireAuth, checkUser };
