(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global, true);
    } else {
        global.returnExports = factory(window);
    }
})(typeof window !== 'undefined' ? window : this,function (window, noGlabal) {
    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    function Promise(fn) {
        var state = PENDING;
        var value = null;
        var handlers = [];

        function fulfill(result) {
            state = FULFILLED;
            value = result;
            handlers.forEach(handle);
            handlers = null;
        }

        function reject(error) {
            state = REJECTED;
            value = error;
            handlers.forEach(handle);
            handlers = null;
        }

        function resolve(result) {
            try {
                var then = getThen(result);
                if (then) {
                    doResolve(then.bind(result), resolve, reject);
                    return;
                }
                fulfill(result);
            } catch(ex) {
                reject(ex);
            }
        }

        function handle(handler) {
            if (state === PENDING) {
                handlers.push(handler);
            } else {
                if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
                    handler.onFulfilled(value);
                }
                if (state === REJECTED && typeof handler.onRejected === 'function') {
                    handler.onRejected(value);
                }
            }
        }

        this.done = function(onFulfilled, onRejected) {
            // ensure we are always asynchronous
            setTimeout(function() {
                handle({
                    onFulfilled: onFulfilled,
                    onRejected: onRejected
                });
            }, 0);
        };

        this.then = function(onFulfilled, onRejected) {
            var self = this;
            return new Promise(function(resolve, reject) {
                return self.done(function(result) {
                    if (typeof onFulfilled === 'function') {
                        try {
                            return resolve(onFulfilled(result));
                        } catch(ex) {
                            return reject(ex);
                        }
                    } else {
                        return resolve(result);
                    }
                }, function(error) {
                    if (typeof onRejected === 'function') {
                        try {
                            return resolve(onRejected(error));
                        } catch(ex) {
                            return reject(ex);
                        }
                    } else {
                        return reject(error);
                    }
                });
            });
        };

        doResolve(fn, resolve, reject);
    }

    /**
     * Check if a value is a Promise and, if it is,
     * return the `then` method of that promise.
     * @param {Promise|Any} value
     * @return {Function|Null}
     */
    function getThen(value) {
        var t = typeof value;
        if (value && (t === 'object' || t === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }
    /**
     * @param {Function} fn A resolver function that may not be trusted
     * @param {Function} onFulfilled
     * @param {Function} onRejected
     */
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function(value) {
                if (done) return;
                done = true;
                onFulfilled(value);
            }, function(reason) {
                if (done) return;
                done = true;
                onRejected(reason);
            });
        } catch(ex) {
            if (done) return;
            done = true;
            onRejected(ex);
        }
    }
    /**
     * @param 引入微信JDK
     */
    function loadWX() {
        return new Promise(function(resolve, reject){
            if(window['wx'] == undefined){
                var head = document.querySelector('head');
                var script = document.createElement('script');
                script.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js';
                head.appendChild(script);
                script.addEventListener('load', function () {
                    resolve({wx:true});
                })
            }else {
                resolve({wx:true});
            }
        });
    }

    // 获取分享的信息
    function getShareInfo() {
        var url = window.location.href.split('#')[0];
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            var completed = 4;
            if(xhr.readyState === completed){
                if(xhr.status === 200 ){
                    var result = typeof xhr.response == 'string' ? JSON.parse(xhr.response) : xhr.response;
                    wx.config({
                        debug: false,
                        appId:result.data.appid,
                        timestamp:result.data.timestamp,
                        nonceStr: result.data.nonceStr,
                        signature:result.data.signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ]
                    });
                }else{
                    // alert('获取分享信息失败~');
                }
            }
        };
        xhr.open('POST', 'https://www.codoon.com/weixin/codoon/get_weixin_signature', true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send('url=' + encodeURIComponent(url));
    }

    //

    // 判断是否是微信
    function isWX() {
        var ua = navigator.userAgent.toLowerCase();
        return  ua.indexOf('micromessenger') != -1;
    }
    // 设置分享内容
    /*
    *  用户自定义分享内容
    *  {title: '', desc: '', link: '', imgUrl: ''}
    **/
    function configAndShare(options) {
        if(!isWX()) return false;
        loadWX().then(function(res){
            getShareInfo();
            wx.ready(function () {
                var shareObject = {
                    title: options.title,
                    desc: options.desc,
                    link: options.link,
                    imgUrl: options.imgUrl
                };
                // 分享给朋友
                wx.onMenuShareAppMessage(shareObject);
                // 分享到朋友圈
                wx.onMenuShareTimeline(shareObject);
                // 分享到QQ
                wx.onMenuShareQQ(shareObject);
                // 分享到腾讯微博
                wx.onMenuShareWeibo(shareObject);
            })
        });

    }
    return {
        config: configAndShare
    }
});
