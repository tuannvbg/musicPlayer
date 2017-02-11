for (var i = 0; i < songName.length; i++) {
    var a = informationName.innerText
    var b = songName[i].innerText
    if (b == a) {
        var currentMusicIndex = i % songName.length
        // 在此处设置播放结束后下一曲的序号
        // 可以设置音乐循环模式,将orderLoop的计算方式更换一下即可
        // var orderLoop = (i + 1) % songName.length
        var pastMusicIndex = (currentMusicIndex - 1) % songName.length
        var nextMusicIndex = (currentMusicIndex + 1) % songName.length
        var pastMusicName = songName[pastMusicIndex].innerText
        var nextMusicName = songName[nextMusicIndex].innerText
        var nowMusicName = songName[currentMusicIndex].innerText
        var song = "music\\" + nowMusicName + '.mp3'
        var cover = "cover\\" + nowMusicName + '.jpg'
        var pastCover = "cover\\" + pastMusicName + '.jpg'
        var NextCover = "cover\\" + nextMusicName + '.jpg'
        informationName.innerText = nowMusicName
        platePast.src = pastCover
        plateNow.src = cover
        plateNext.src = NextCover
        musicCover.src = cover
        music.src = song
        musicPlay()
        break
    }
}
