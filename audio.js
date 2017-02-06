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

var music = dqs('#id-music-playing')
var playIcon = dqs('#id-icon-play')
var pauseIcon = dqs('#id-icon-pause')
var nextIcon = dqs('#id-icon-play-forward')
var preIcon = dqs('#id-icon-play-back')
var musicPicture = dqs('.music-picture')
var currentTime = dqs('#id-current-time')
var totalTime = dqs('#id-total-time')
var playedBar = dqs('#id-played-bar')
var musicBar = dqs('#id-music-bar')
// 初始化播放音量和循环
music.volume = 0.08
// music.loop = true

var musicPlay = function(){
    music.play()
    toggleClass(playIcon, 'hidden')
    toggleClass(pauseIcon, 'hidden')
    toggleClass(musicPicture, 'rotated')
}
var musicPause = function(){
    music.pause()
    toggleClass(pauseIcon, 'hidden')
    toggleClass(playIcon, 'hidden')
    toggleClass(musicPicture, 'rotated')
}
playIcon.addEventListener('click', musicPlay)
pauseIcon.addEventListener('click', musicPause)

music.addEventListener('canplay', function(){
    // music 载入音乐需要时间, 载入完成后会触发 'canplay' 事件
    // 所以我们在 canplay 里面设置时间
    totalTime.innerHTML = transTime(music.duration)
})
music.addEventListener('timeupdate', function(){
    currentTime.innerHTML = transTime(music.currentTime)
})

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

var playList = dqs('.play-list')
playList.addEventListener('click', function(event){
    var target = event.target
    if (target.classList.contains('play-list-song')) {
        var song = target.attributes["path"].value
        music.src = song
        // 点击playbutton
        playIcon.click()
        // if (!music.paused) {
        //     toggleClass(playIcon, 'hidden')
        //     toggleClass(pauseIcon, 'hidden')
        //     toggleClass(musicPicture, 'rotated')
        // }
    }
})
var playLists = dqsa('.play-list-song')
var songs = [
    playLists[0].attributes["path"].value,
    playLists[1].attributes["path"].value,
    playLists[2].attributes["path"].value,
]
var currentSongIndex = 0
music.addEventListener('ended', function(){
    currentSongIndex = (currentSongIndex + 1) % songs.length
    var song = songs[currentSongIndex]
    music.src = song
    music.play()
})
// 下一曲
nextIcon.onclick = function () {
    changeMusic('next');
};

// 上一曲
preIcon.onclick = function () {
    changeMusic('prev');
};

// 切换歌曲
var currentSrcIndex = 0
function changeMusic (direct) {
    if (direct === 'next') {
        ++ currentSrcIndex > songs.length - 1 && (currentSrcIndex = 0); // 下一曲
    } else {
        -- currentSrcIndex < 0 && (currentSrcIndex = songs.length -1); // 上一曲
    }
    currentSrc = songs[currentSrcIndex].attributes["src"].value;
    currentImg = songs[currentSrcIndex].getAttribute('data-img')
    musicImg.setAttribute('src', currentImg);
    music.setAttribute('src', currentSrc);
    music.play();
    play.innerHTML = 'Pause';
    musicImg.style.animation = 'xuanzhuan 5s linear infinite';
    musicTime();
}
