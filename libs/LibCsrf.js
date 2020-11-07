// LibCsrf
var csrf = require('csrf');
var tokens = new csrf();

//
export default {
    set_token:function(req, res){
        //新規で秘密文字とトークンを生成する
        var secret = tokens.secretSync();
        var token = tokens.create(secret);
        //秘密文字をセッションに保存する
        req.session._csrf = secret;
        //トークンをCookieに保存する
        res.cookie('_csrf', token);
    },
    valid_token:function(req, res){
        try{
            var secret = req.session._csrf;
            var token = req.cookies._csrf;
            if(tokens.verify(secret, token) === false){
                throw new Error('Invalid Token');
            }
            return true
        } catch (e) {
            res.clearCookie('user');
            console.log(e);
            return false
        }  

    }

}