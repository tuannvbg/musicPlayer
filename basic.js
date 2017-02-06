// 基本函数定义
var log = function() {
    console.log.apply(console, arguments)
}

var dqsa = function(selector){
    return document.querySelectorAll(selector)
}

var dqs = function(selector){
    return document.querySelector(selector)
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
// 把秒（153.54）转换成时间格式02:33
var transTime = function(time) {
    var minute = parseInt(time / 60);
    var second = parseInt(time % 60);
    if (minute < 10) {
        minute = '0'+ minute;
    }
    if (second < 10) {
        second = '0'+ second;
    }
    var t =  `${minute}:${second}`
    return t
}
