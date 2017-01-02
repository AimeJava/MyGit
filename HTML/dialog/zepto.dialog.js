//定义函数用于构造，来传递参数
var Dialog = function(config) {
    //默认配置参数
    this.config = {
        //对话框宽高
        width: "auto",
        height: "auto",
        //对话框提示信息
        message: null,
        //对话框类型
        type: "waiting",
        //按钮配置
        buttons: null,
        //对话框保持时间3秒
        delay: null,
        //对话框遮罩层透明度
        maskOpcity: 0.8
    };
    //如果用户输入参数，将参数扩展
    if (config && $.isPlainObject(config)) {
        $.extend(this.config, config);
    }
    //给函数定义变量，并和config对象一起传入原型
    this.body = $("body");
    this.mask = $("<div class='g-dialog-contianer'>");
    this.win = $('<div class="dialog-window">');
    this.winHeader = $('<div class="dialog-header"></div>');
    this.winContent = $('<div class="dialog-container">');
    this.winFooter = $('<div class="dialog-footer">');
};

//原型中定义函数
Dialog.prototype = {
    creat: function() {
        //1.this指的就是该原型对象
        //2.(this.)表示原型对象调用函数中的变量
        var _this_ = this,
            config = this.config,
            body = this.body,
            mask = this.mask,
            win = this.win,
            winHeader = this.winHeader,
            winContent = this.winContent,
            winFooter = this.winFooter;
        //如果用户没输入参数,默认弹出等待框,否则用扩展值
        win.append(winHeader.addClass(config.type));
        //如果用户输入massage，显示到弹框中
        if (config.message) {
            win.append(winContent.html(config.message));
        }
        //如果用户输入按钮组
        if (config.buttons) {
            this.creatButton(winFooter, config.buttons);
            win.append(winFooter);
        }
        //如果用户自定义弹出框的宽高
        if (config.width != 'auto') {
            win.width(config.width);
        }
        if (config.height != 'auto') {
            win.height(config.height);
        }
        //默认透明度为0.8
        var opct = config.maskOpcity;
        mask.css("backgroundColor", "rgba(0,0,0," + opct + ")");
        //如果用户输入弹框保持时间
        if (config.delay && config.delay !== 0) {
            window.setTimeout(function() {
                //调用原型中的close()方法
                _this_.close();
            }, config.delay);
        }
        //渲染html
        mask.append(win);
        body.append(mask);
    },

    //关闭弹出框
    close: function() {
        this.mask.remove();
    },

    //创建按钮组
    creatButton: function(footer, buttons) {
        var _this_ = this;
        //遍历出数组
        $(buttons).each(function(index, element) {
            var type = element.type ? " class=" + element.type : "";
            var text = element.text ? element.text : "button" + index;
            var callback = element.callback ? element.callback : null;

            var singleButton = $("<button" + type + ">" + text + "</button>");
            //如果有回调函数，按钮绑定回调函数
            if (callback) {
                singleButton.on('click', function() {
                    callback();
                    _this_.close();
                });
            }
            //否则默认为关闭弹出框
            else {
                singleButton.on('click', function() {
                    _this_.close();
                });
            }
            footer.append(singleButton);
        });
    }
};

function startDialog1() {
    var dialog = new Dialog();
    dialog.creat();
}

function startDialog2() {
    var dialog = new Dialog({
        width: "auto",
        height: "auto",
        type: "warning",
        delay: 2000,
    });
    dialog.creat();
}

function startDialog3() {
    var dialog = new Dialog({
        width: "auto",
        height: "auto",
        type: "success",
        buttons: [{
            type: "green",
            text: "确定",
        }, {
            type: "red",
            text: "取消"
        }]
    });
    dialog.creat();
}

function startDialog4() {
    var dialog = new Dialog({
        width: "auto",
        height: "auto",
        type: "warning",
        buttons: [{
            type: "green",
            text: "确定",
            callback: function() {

            }
        }]
    });
    dialog.creat();
}

function startDialog5() {
    var dialog = new Dialog({
        width: "auto",
        height: "auto",
        buttons: [{
            type: "green",
            text: "确定",
            callback: function() {

            }
        }, {
            type: "green",
            text: "确定",
            callback: function() {

            }
        }, {
            type: "green",
            text: "确定",
            callback: function() {

            }
        }]
    });
    dialog.creat();
}

function startDialog6() {
    var dialog = new Dialog({
        width: "auto",
        height: "auto",
        message: "你是否要清空购物车？",
        type: "warning",
        buttons: [{
            type: "green",
            text: "确定",
            callback: function() {
                window.open('http://baidu.com');
            }
        }, {
            type: "red",
            text: "取消"
        }],
        maskOpcity: 0.6
    });
    dialog.creat();
}
