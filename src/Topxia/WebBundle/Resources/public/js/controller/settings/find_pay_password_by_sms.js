define(function(require, exports, module) {
    var Validator = require('bootstrap.validator');
    require('common/validator-rules').inject(Validator);
    var SmsSender = require('../widget/sms-sender');
    
    exports.run = function() {
        var validator = new Validator({
            element: '#settings-find-pay-password-form',
            onFormValidated: function(error){
                if (error) {
                    return false;
                }
                    $('#password-save-btn').button('submiting').addClass('disabled');
                }
            });
            
            var smsSender = new SmsSender({
                element: '.js-sms-send',
                url: $('.js-sms-send').data('url'),
                smsType:'sms_forget_pay_password'       
            });
        
    };

});