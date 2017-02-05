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

var music = dqs('#id-music-01')
var playIcon = dqs('#id-icon-play')
var pauseIcon = dqs('#id-icon-pause')

music.volume = 0.01
playIcon.addEventListener('click', function(){
    music.play()
    toggleClass(playIcon, 'hidden')
    toggleClass(pauseIcon, 'hidden')
})
pauseIcon.addEventListener('click', function(){
    music.pause()
    toggleClass(pauseIcon, 'hidden')
    toggleClass(playIcon, 'hidden')
})

var currentTime = dqs('#id-current-time')
var totalTime = dqs('#id-total-time')
music.addEventListener('canplay', function(){
    // music 载入音乐需要时间, 载入完成后会触发 'canplay' 事件
    // 所以我们在 canplay 里面设置时间
    totalTime.innerHTML = transTime(music.duration)
})
music.addEventListener('timeupdate', function(){
    currentTime.innerHTML = transTime(music.currentTime)
})

	// 播放进度条控制播放时间
var playedBar = dqs('#id-played-bar')
var musicBar = dqs('#id-music-bar')
// mouseover当鼠标在进度条上时，显示其当前时间
// playedBar.addEventListener('mouseover', function ()

// 函数直接调用
musicBar.onclick = function () {
    var musicBarWidth = musicBar.clientWidth;
    var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration;
    music.currentTime = newCurrentTime;
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth;
    playedBar.style.width = playedBarWidth + 'px';
}
playedBar.onclick = function () {
    var musicBarWidth = musicBar.clientWidth;
    var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration;
    music.currentTime = newCurrentTime;
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth;
    playedBar.style.width = playedBarWidth + 'px';
}
// 播放进度实时更新(修改为歌曲播放时开启定时器，暂停和页面load时清除定时器)
setInterval(function updatePlayedBar (){
    var musicBarWidth = musicBar.clientWidth;
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth;
    playedBar.style.width = playedBarWidth + 'px';
    currentTime.innerHTML = transTime(music.currentTime);
    //如果是时间结束，并且是非单曲循环，自动下一曲
    if (music.currentTime === music.duration && !music.loop) {
        next.onclick();
    }
}, 1000);
