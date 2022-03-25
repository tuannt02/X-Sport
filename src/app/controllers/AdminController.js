

class AdminController   {
    login(req, res) {
        res.send('Admin Login page');
    }

    show(req, res)  {
        res.send('Admin page');
    }
}


module.exports = new AdminController;


