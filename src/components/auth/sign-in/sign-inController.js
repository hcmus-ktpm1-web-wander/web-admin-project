const service = require('./sign-inService')


/*************************** GET methods ***************************/

// Render sign-in fail
exports.renderSignInFail = (req, res) => {
    res.render("auth/sign-in/views/sign-in", { layout: './auth/sign-in/views/sign_in_layout', validate: { isTrue: false } });
};


// Render sign-in
exports.renderSignIn = (req, res) => {
    console.log("render signin");
    res.render("auth/sign-in/views/sign-in", { layout: './auth/sign-in/views/sign_in_layout', validate: { isTrue: true } });
};

// Verify
exports.Verify = async (req, res) => {
    console.log('-------------');
    const in_usrname = req.body.usrname;
    const in_passwd = req.body.passwd;
    const account = await service.getUsrname(in_usrname);

    console.log('-- get account: ', account);

    if (account != null)
        if (await service.checkPasswd(in_passwd, account)) {
            console.log('-> Check True');
            res.redirect("../dashboard");
        }
        else {
            console.log('-> Check False');
            this.renderSignInFail(req, res);
        }
    else {
        console.log('Can not find account');
        this.renderSignInFail(req, res);
    }




}

