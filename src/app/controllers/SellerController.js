

class SellerController   {
    login(req, res) {
        res.send('Seller Login page');
    }

    register(req, res)  {
        res.send('Seller Register page');
    }

    show(req, res)  {
        res.send('Admin page');
    }
}


module.exports = new SellerController;


