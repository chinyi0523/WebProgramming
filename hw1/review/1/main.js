// a map of image source website and image name
const imageNameWebsiteMap = {
    hyojin: 'https://imgur.com/8NNyX9d.jpg',
    'j-us': 'https://imgur.com/iv2VotR.jpg',
    etion: 'https://imgur.com/vCWbvk8.jpg',
    wyatt: 'https://imgur.com/QUcE0Xe.jpg',
    mk: 'https://imgur.com/J93elUX.jpg',
    u: 'https://imgur.com/a5wwEG1.jpg',
}

// a name list of images
const imageNameList = Object.keys(imageNameWebsiteMap)

const changeLinkHref = (href) => {
    // functuion that will change the source of link and its innerHTML to new href

    let a_tag = document.getElementById('source')
    a_tag.href = href
    a_tag.innerHTML = 'Source:' + href
}

// current index of image list
let currentIndex = 0

const handleButtonOnClick = (BackorNext) => {
    // if BackorNext is true means it want to go forward

    let main_display = document.getElementById('display')
    main_display.src = './images/loading.gif'
    main_display.onload = handleChangePic

    if (BackorNext) {
        console.log('next')
        handleChangeCurrentIndex(1)
    } else {
        console.log('back')
        handleChangeCurrentIndex(-1)
    }

    // console.log(currentIndex) for test
}

const handleChangePic = () => {
    // a func that change the gear gif to the target pic
    let main_display = document.getElementById('display')
    let currentImageAddress = imageNameWebsiteMap[imageNameList[currentIndex]]
    main_display.src = currentImageAddress

    // Temporarily!!! need to change to website address
    changeLinkHref(currentImageAddress)

    main_display.onload = null
}

const handleChangeCurrentIndex = (increment) => {
    // a func that change the current index of our pic, and make some limitations
    currentIndex = currentIndex + increment

    if (currentIndex >= imageNameList.length - 1) {
        let right_btn_div = document.getElementById('carousel-right')
        let right_btn = document.getElementById('btn-right')
        right_btn_div.className = right_btn_div.className + ' disabled'
        right_btn.disabled = true
    } else if (currentIndex <= 0) {
        let left_btn_div = document.getElementById('carousel-left')
        let left_btn = document.getElementById('btn-left')
        left_btn_div.className = left_btn_div.className + ' disabled'
        left_btn.disabled = true
    } else {
        let right_btn_div = document.getElementById('carousel-right')
        let left_btn_div = document.getElementById('carousel-left')
        let right_btn = document.getElementById('btn-right')
        let left_btn = document.getElementById('btn-left')
        right_btn_div.className = 'carousel'
        left_btn_div.className = 'carousel'
        right_btn.disabled = false
        left_btn.disabled = false
    }
}
