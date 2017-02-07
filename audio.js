
var music = dqs('#id-music-playing')
var playIcon = dqs('#id-icon-play')
var pauseIcon = dqs('#id-icon-pause')
var nextIcon = dqs('#id-icon-play-forward')
var preIcon = dqs('#id-icon-play-back')
var musicCover = dqs('.music-cover')
var currentTime = dqs('#id-current-time')
var totalTime = dqs('#id-total-time')
var playedBar = dqs('#id-played-bar')
var musicBar = dqs('#id-music-bar')
var playList = dqs('.play-list')
var playLists = dqsa('.play-list-song')
var musicName = dqs('.music-name')
var tr =dqsa('tr')

var musicPlay = function(){
    music.play()
    toggleClass(playIcon, 'hidden')
    toggleClass(pauseIcon, 'hidden')
    toggleClass(musicCover, 'rotated')
}
var musicPause = function(){
    music.pause()
    toggleClass(pauseIcon, 'hidden')
    toggleClass(playIcon, 'hidden')
    toggleClass(musicCover, 'rotated')
}
playIcon.addEventListener('click', musicPlay)
pauseIcon.addEventListener('click', musicPause)
// 播放时间显示
// music 载入音乐需要时间, 载入完成后会触发 'canplay' 事件
// 所以我们在 canplay 里面设置时间
music.addEventListener('canplay', function(){
    totalTime.innerHTML = transTime(music.duration)
})
music.addEventListener('timeupdate', function(){
    currentTime.innerHTML = transTime(music.currentTime)
})


// 函数直接调用
musicBar.onclick = function () {
    var musicBarWidth = musicBar.clientWidth
    var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration
    music.currentTime = newCurrentTime
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth
    playedBar.style.width = playedBarWidth + 'px'
}
playedBar.onclick = function () {
    var musicBarWidth = musicBar.clientWidth
    var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration
    music.currentTime = newCurrentTime
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth
    playedBar.style.width = playedBarWidth + 'px'
}
// 播放进度实时更新(修改为歌曲播放时开启定时器，暂停和页面load时清除定时器)
setInterval(function updatePlayedBar (){
    var musicBarWidth = musicBar.clientWidth
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth
    playedBar.style.width = playedBarWidth + 'px'
    currentTime.innerHTML = transTime(music.currentTime)
    //如果是时间结束，并且是非单曲循环，自动下一曲
    if (music.currentTime === music.duration && !music.loop) {
        nextIcon.click()
    }
}, 1000)

playList.addEventListener('click', function(event){
    var target = event.target
    if (target.classList.contains('play-list-song')) {
        var song = target.attributes["path"].value
        music.src = song
        var a = playIcon.classList.contains('hidden')
        var b = musicCover.classList.contains('rotated')
        if (a&&b) {
            toggleClass(pauseIcon, 'hidden')
            toggleClass(playIcon, 'hidden')
            toggleClass(musicCover, 'rotated')
        }
        playIcon.click()
    }
})

$('.list-search').on('keyup', function(event){
    var search = event.target
    var v = search.value
    searchTitle(v)
})

var searchTitle = function(v) {
    $('.play-list-song').hide()
    $('.play-list-song').each(function(){
        var title = $(this)
        if (title.text().toLowerCase().includes(v.toLowerCase())) {
            title.show()
        }
    })
}
var likeIcon = '<img src="icon\\like.png" class="icon-like" style="width:16px;height:16px;" >'
var unlikeIcon =  '<img src="icon\\unlike.png" class="icon-unlike" style="width:16px;height:16px">'
$('.music-name').prepend(unlikeIcon)
$('.music-name').prepend(likeIcon)
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
nextIcon.addEventListener('click', function () {
    changeMusic('next')

})
// 上一曲
preIcon.addEventListener('click', function () {
    changeMusic('pre')
})
// 切换歌曲
// 找出当前music.src的值

var changeMusic = function (direct) {
    if (music.attributes["src"] == undefined) {
        var currentSrcIndex = 0
    } else {
        for (var i = 0; i < songs.length; i++) {
            if (music.attributes["src"].value == songs[i]) {
                var currentSrcIndex = i
            }
        }
    }
    if (direct === 'next') {
        var currentSrcIndex = (currentSrcIndex + 1) % songs.length
    } else {
        var currentSrcIndex = (currentSrcIndex -1 + songs.length * 100) % songs.length
    }
    music.src = songs[currentSrcIndex]
    // currentImg = songs[currentSrcIndex].getAttribute('data-img')
    // musicImg.setAttribute('src', currentImg)
    // music.setAttribute('src', currentSrc)
    var a = playIcon.classList.contains('hidden')
    var b = musicCover.classList.contains('rotated')
    if (a&&b) {
        toggleClass(pauseIcon, 'hidden')
        toggleClass(playIcon, 'hidden')
        toggleClass(musicCover, 'rotated')
    }
    playIcon.click()
}

// 初始化播放音量和循环
var playInitialize = function () {
    music.volume = 0.08
    // music.loop = true
}
var _mainFunction = function(){
    playInitialize()
}
_mainFunction()
