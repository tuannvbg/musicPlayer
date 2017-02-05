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

music.volume = 0.1
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
// mouseover
playedBar.addEventListener('mouseover', function () {
//
// })
// playedBar.onclick = function (event) {
//     var musicBarWidth = playedBar.clientWidth;
//     var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration;
//     music.currentTime = newCurrentTime;
//     var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth;
//     playedBar.style.width = playedBarWidth + 'px';
// }
// var musicBarWidth = playedBar.clientWidth;
// var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth;
// playedBar.style.width = playedBarWidth + 'px'
// var loadBar = dqs('#id-load-bar')
// loadBar.onclick = function (event) {
//     var musicBarWidth = loadBar.clientWidth;
//     var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration;
//     music.currentTime = newCurrentTime;
//     var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth;
//     playedBar.style.width = playedBarWidth + 'px';
// }
// musicBar = document.getElementById('music-bar'), // 播放进度控制
// playedBar = document.getElementById('played-bar'), // 已播放进度条
musicBar.onclick = function (event) {
    var musicBarWidth = musicBar.clientWidth;
    var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration;
    music.currentTime = newCurrentTime;
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth;
    playedBar.style.width = playedBarWidth + 'px';
};

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
// 音乐列表
// var a = dqsa('#music-01')
// a.source='music\1.mp3'
// a.play()
// $(document).ready(function() {

//     var music = document.getElementById("music");
//     music.src = "1.mp3";
//
//     $("#Play").on('click', function() {
//         if (music.paused) {
//             if ($(this).children().hasClass('glyphicon-play')) {
//                 $("#Play").children("span").removeClass("glyphicon-play").addClass("glyphicon-pause");
//                 Play();
//             }
//         } else {
//             $("#Play").children("span").removeClass("glyphicon-pause").addClass("glyphicon-play");
//             Pause();
//         }
//     }); // Button cilick
//
//     function Play() {
//         music.play();
//         TimeSpan();
//     } //Play()
//
//     function Pause() {
//         music.pause();
//     } //Pause()
//
//     function TimeSpan() {
//         var ProcessNow = 0;
//         setInterval(function() {
//             var ProcessNow = (music.currentTime / music.duration) * 260;
//             $(".ProcessNow").css("width", ProcessNow);
//             var currentTime = timeFormat(music.currentTime);
//             var timeAll = timeFormat(TimeAll());
//             $(".SongTime").html(currentTime + " | " + timeAll);
//         }, 1000);
//     } //TimeSpan()
//
//     function timeFormat(number) {
//         var minute = parseInt(number / 60);
//         var second = parseInt(number % 60);
//         minute = minute >= 10 ? minute : "0" + minute;
//         second = second >= 10 ? second : "0" + second;
//         return minute + ":" + second;
//     } //timeFormat()
//
//     function TimeAll() {
//         return music.duration;
//     } //TimeAll()
//
// })
