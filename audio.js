
var music = dqs('#id-music-playing')
var playIcon = dqs('#id-icon-play')
var pauseIcon = dqs('#id-icon-pause')
var nextIcon = dqs('#id-icon-play-forward')
var preIcon = dqs('#id-icon-play-back')
var musicCover = dqs('.music-cover')
var volumeMuteIcon = dqs('#id-icon-volume-mute')
var currentTime = dqs('#id-current-time')
var totalTime = dqs('#id-total-time')
var playedBar = dqs('#id-played-bar')
var musicBar = dqs('#id-music-bar')
var playList = dqs('.play-list')
var playLists = dqsa('.play-list-song')
var musicName = dqs('.music-name')
var songName = dqsa('.song-name')
var informationName = dqs('.information-name')
var informationAuthor = dqs('.information-author')
var songArtist = dqsa('.song-artist')
var platePast = dqs('.plate-past')
var plateNow = dqs('.plate-now')
var plateNext = dqs('.plate-next')
var totalVolume = dqs('#total-volume')
var currentVolume = dqs('#current-volume')
var volumeIcon = dqs('#id-icon-volume')
var listCircleIcon = dqs('#id-icon-listcircle')
var singleCircleIcon = dqs('#id-icon-singlecircle')
var totalVolume = dqs('#id-total-volume')
var currentVolume = dqs('#id-current-volume')
var volumeBar = dqs('#id-volume-bar')
var listSearch = dqs('.list-search')
// 查找音乐
var findMusic = function (){
    for (var i = 0; i < songName.length; i++){
        var currentMusicIndex = 0
        var a = informationName.innerText
        var b = songName[i].innerText
        if (b == a){
            var currentMusicIndex = i % songName.length
            var pastMusicIndex = (currentMusicIndex - 1 + songName.length) % songName.length
            var nextMusicIndex = (currentMusicIndex + 1) % songName.length
            var pastMusicName = songName[pastMusicIndex].innerText
            var nextMusicName = songName[nextMusicIndex].innerText
            var nowMusicName = songName[currentMusicIndex].innerText
            var nowAuthorName = songArtist[currentMusicIndex].innerText
            var song = "music\\" + nowMusicName + '.mp3'
            var cover = "cover\\" + nowMusicName + '.jpg'
            var pastCover = "cover\\" + pastMusicName + '.jpg'
            var NextCover = "cover\\" + nextMusicName + '.jpg'
            informationName.innerText = nowMusicName
            informationAuthor.innerText = nowAuthorName
            platePast.src = pastCover
            plateNow.src = cover
            plateNext.src = NextCover
            musicCover.src = cover
            music.src = song
            break
        }
    }
}
// 音乐播放
var musicPlay = function(){
    music.play()
    playIcon.classList.add('hidden')
    pauseIcon.classList.remove('hidden')
    musicCover.classList.add('rotated')
}
// 音乐暂停
var musicPause = function(){
    music.pause()
    playIcon.classList.remove('hidden')
    pauseIcon.classList.add('hidden')
    musicCover.classList.remove('rotated')
}
// 给播放、暂停按钮绑定事件
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
// setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
setInterval(function updatePlayedBar(){
    var musicBarWidth = musicBar.clientWidth
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth
    playedBar.style.width = playedBarWidth + 'px'
    currentTime.innerHTML = transTime(music.currentTime)
    //如果是时间结束，并且是非单曲循环，自动下一曲
    if (music.currentTime === music.duration && !music.loop){
        nextIcon.click()
    }
}, 1000)

// 播放模式：目前只有单曲循环和列表循环
listCircleIcon.addEventListener('click', function(){
    singleCircleIcon.classList.remove('hidden')
    listCircleIcon.classList.add('hidden')
    music.loop = true
})
singleCircleIcon.addEventListener('click', function(){
    singleCircleIcon.classList.add('hidden')
    listCircleIcon.classList.remove('hidden')
    music.loop = false
})

// 设置播放进度条
musicBar.addEventListener('click', function (){
    var musicBarWidth = musicBar.clientWidth
    var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration
    music.currentTime = newCurrentTime
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth
    playedBar.style.width = playedBarWidth + 'px'
})
playedBar.addEventListener('click', function (){
    var musicBarWidth = musicBar.clientWidth
    var newCurrentTime = (event.offsetX / musicBarWidth) * music.duration
    music.currentTime = newCurrentTime
    var playedBarWidth = (music.currentTime / music.duration) * musicBarWidth
    playedBar.style.width = playedBarWidth + 'px'
})

// 音量控制
volumeIcon.addEventListener('mouseover', function(){
    volumeBar.classList.remove('unvisi')
})
volumeIcon.addEventListener('mouseout', function(){
    volumeBar.classList.add('unvisi')
})
volumeBar.addEventListener('mouseover', function(){
    volumeBar.classList.remove('unvisi')
})
volumeBar.addEventListener('mouseout', function(){
    volumeBar.classList.add('unvisi')
})
volumeMuteIcon.addEventListener('click', function(){
    volumeIcon.classList.remove('hidden')
    volumeMuteIcon.classList.add('hidden')
    music.muted = false
})
volumeIcon.addEventListener('click', function(){
    volumeIcon.classList.add('hidden')
    volumeMuteIcon.classList.remove('hidden')
    music.muted = true
})
totalVolume.addEventListener('click', function (){
    var totalVolumeWidth = totalVolume.clientWidth
    var newCurrentVolume = event.offsetX / totalVolumeWidth
    music.volume = newCurrentVolume
    var currentVolumeWidth = newCurrentVolume * totalVolumeWidth
    currentVolume.style.width = currentVolumeWidth + 'px'
})
currentVolume.addEventListener('click', function (){
    var totalVolumeWidth = totalVolume.clientWidth
    var newCurrentVolume = event.offsetX / totalVolumeWidth
    music.volume = newCurrentVolume
    var currentVolumeWidth = newCurrentVolume * totalVolumeWidth
    currentVolume.style.width = currentVolumeWidth + 'px'
})
// 歌曲列表点击，播放音乐
playList.addEventListener('click', function(event){
    var target = event.target
    if (target.classList.contains('song-name')){
        // 可以根据childNodes找到相邻的歌曲信息,可以将右边的图片改为歌手的图片
        // var a002 = target.parentElement.childNodes[5].innerText
        // log(target, a002)
        var song = "music\\" + target.innerText + '.mp3'
        var cover = "cover\\" + target.innerText + '.jpg'
        informationName.innerText = target.innerText
        musicCover.src = cover
        music.src = song
        findMusic()
        musicPlay()
    }
})

// 表格的样式设计，奇数和偶数行的background-color不同
for(i = 0; i < playLists.length; i++){
    if(i % 2 == 0){
        playLists[i].classList.add("even-row-color");
    } else {
        playLists[i].classList.add("odd-row-color");
    }
}
// 歌曲搜索功能
listSearch.addEventListener('keyup', function(event){
    var search = event.target
    var v = search.value
    searchTitle(v)
})

var searchTitle = function(v){
    // 给所有歌曲添加隐藏class
    for (var i = 0; i < playLists.length; i++) {
        playLists[i].classList.add('hidden')
    }
    // 当歌曲的innerText包含搜索信息是去除class
    for (var i = 0; i < playLists.length; i++) {
        var a = playLists[i]
        if (a.innerText.toLowerCase().includes(v.toLowerCase())){
            a.classList.remove('hidden')
        }
    }
}

var likeIcon = `<div class='likes  none'><img src="icon\\like.png" class="icon-like" style="width:16px;height:16px;"></div>`
var unlikeIcon = `<div class='likes'><img src="icon\\unlike.png" class="icon-unlike" style="width:16px;height:16px"></div>`

// 喜欢按钮（事件委托，在事先存在的父元素上绑定事件）
for (var i = 0; i < playLists.length; i++){
    playLists[i].insertAdjacentHTML('afterbegin', likeIcon)
    playLists[i].insertAdjacentHTML('afterbegin', unlikeIcon)
    playLists[i].addEventListener('click', function(){
        var target = event.target
        var targetParent = target.parentElement
        var targetParents = target.parentElement.parentElement
        if(target.classList.contains('icon-like')){
            targetParent.classList.add('none')
            targetParents.childNodes[0].classList.remove('none')
        }
        if(target.classList.contains('icon-unlike')){
            targetParent.classList.add('none')
            targetParents.childNodes[1].classList.remove('none')
        }
    })
}

// 音乐播放结束后播放下一首
music.addEventListener('ended', function(){
    for (var i = 0; i < songName.length; i++){
        var a = informationName.innerText
        var b = songName[i].innerText
        if (a == b){
            // 在此处设置播放结束后下一曲的序号
            // 可以设置音乐循环模式,将orderLoop的计算方式更换一下即可
            var orderLoop = (i + 1) % songName.length
            var f = songName[orderLoop].innerText
            var song = "music\\" + f + '.mp3'
            var cover = "cover\\" + f + '.jpg'
            informationName.innerText = f
            musicCover.src = cover
            music.src = song
            findMusic()
            musicPlay()
            break
        }
    }
})
// 下一曲// 上一曲
nextIcon.addEventListener('click', function (){
    changeMusic('next')
})
preIcon.addEventListener('click', function (){
    changeMusic('pre')
})
// 切换歌曲，只需要找出当前music.src的值
var changeMusic = function (direct){
    if (music.attributes["src"] == undefined){
        var currentSrcIndex = 0
    } else {
        for (var i = 0; i < songName.length; i++){
            var b = informationName.innerText
            var c = songName[i].innerText
            if (c == b){
                var currentSrcIndex = i % songName.length
                break
                }
            }
        }
    if (direct === 'next'){
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
    findMusic()
    musicPlay()
}
// 初始化播放音量和循环
var playInitialize = function (){
    music.volume = 0.3
    currentVolume.style.width = '21px'
    // music.loop = true
}
var _mainFunction = function(){
    playInitialize()
}
_mainFunction()
