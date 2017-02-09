
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
var songName = dqsa('.song-name')
var tr =dqsa('tr')
var informationName = dqs('.information-name')
var informationAuthor = dqs('.information-author')
var songArtist = dqsa('song-artist')


var musicPlay = function(){
    music.play()
    playIcon.classList.add('hidden')
    pauseIcon.classList.remove('hidden')
    musicCover.classList.add('rotated')
    // toggleClass(playIcon, 'hidden')
    // toggleClass(pauseIcon, 'hidden')
    // toggleClass(musicCover, 'rotated')
}
var musicPause = function(){
    music.pause()
    playIcon.classList.remove('hidden')
    pauseIcon.classList.add('hidden')
    musicCover.classList.remove('rotated')
    // toggleClass(pauseIcon, 'hidden')
    // toggleClass(playIcon, 'hidden')
    // toggleClass(musicCover, 'rotated')
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

// 函数直接调用
// 设置播放进度条
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

playList.addEventListener('click', function(event){
    var target = event.target
    if (target.classList.contains('song-name')) {
        var song = "music\\" + target.innerText + '.mp3'
        var cover = "cover\\" + target.innerText + '.jpg'
        informationName.innerText = target.innerText
        musicCover.src = cover
        music.src = song
        musicPlay()
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
$('.song-name').prepend(unlikeIcon)
$('.song-name').prepend(likeIcon)

// var songs = [
//     playLists[0].attributes["path"].value,
//     playLists[1].attributes["path"].value,
//     playLists[2].attributes["path"].value,
// ]
// 音乐播放结束后播放下一首

music.addEventListener('ended', function(){
    for (var i = 0; i < songName.length; i++) {
        var b = informationName.innerText
        var c = songName[i].innerText
        if (c == b) {
            // 在此处设置播放结束后下一曲的序号
            // 可以设置音乐循环模式,将orderLoop的计算方式更换一下即可
            var orderLoop = (i + 1) % songName.length
            var f = songName[orderLoop].innerText
            var song = "music\\" + f + '.mp3'
            var cover = "cover\\" + f + '.jpg'
            informationName.innerText = f
            musicCover.src = cover
            music.src = song
            musicPlay()
            break
        }
    }
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
                for (var i = 0; i < songName.length; i++) {
                    var b = informationName.innerText
                    var c = songName[i].innerText
                    if (c == b) {
                        var currentSrcIndex = i % songName.length
                        break
                    }
                }
            }
    if (direct === 'next') {
        var currentSrcIndex = (currentSrcIndex + 1) % songName.length
    } else {
        var currentSrcIndex = (currentSrcIndex -1 + songName.length * 100) % songName.length
    }
    var f = songName[currentSrcIndex].innerText
    var song = "music\\" + f + '.mp3'
    var cover = "cover\\" + f + '.jpg'
    informationName.innerText = f
    musicCover.src = cover
    music.src = song
    musicPlay()
}

// 初始化播放音量和循环
var playInitialize = function () {
    music.volume = 0.2
    // music.loop = true
}
var _mainFunction = function(){
    playInitialize()
}
_mainFunction()
