
class BuyerController    {
    
    // [GET] /login
    login(req,res) {
        res.render('login', {layout: 'login'});
    }

    // [POST] /login -> authenticate
    authenticate(req,res)   {
        console.log(req.body);
        res.render('login');
    }

    // [GET] /register
    register(req,res)   {
        res.render('register');
    }

    // [GET] /
    // -> isLogin == true ? ->homePage : -> loginPage
    rerouting(req,res)  {
        res.redirect('http://localhost:3001/buyer/login');
    }
}

module.exports = new BuyerController;