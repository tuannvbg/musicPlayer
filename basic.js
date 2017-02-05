var log = function() {
    console.log.apply(console, arguments)
}

var dqsa = function(selector){
    return document.querySelectorAll(selector)
}

var dqs = function(selector){
    return document.querySelector(selector)
}
