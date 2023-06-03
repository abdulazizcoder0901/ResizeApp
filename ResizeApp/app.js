const upLoadBox = document.querySelector('.upload-box'),
prevImage = upLoadBox.querySelector('img'),
fileInput = upLoadBox.querySelector('input'),
widthInput = document.querySelector('.width input'),
heightInput = document.querySelector('.height input'),
ratioInput = document.querySelector('.ratio input'),
qualityInput = document.querySelector('.quality input'),
downloadBtn = document.querySelector('.download-btn')

let ogImageRatio;
function loadFile (e){
    const file = e.target.files[0]
    if(!file) return
    prevImage.src = URL.createObjectURL(file)
    prevImage.addEventListener('load', () =>{
        widthInput.value = prevImage.naturalWidth;
        heightInput.value = prevImage.naturalHeight;
        ogImageRatio = prevImage.naturalWidth / prevImage.naturalHeight
        document.querySelector('.wrapper').classList.add('active')
    })
}

widthInput.addEventListener('keyup', () =>{
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height)
})

heightInput.addEventListener('keyup', () =>{
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width)
})

function resizeDownload(){
    const canvas = document.createElement('canvas')
    const a = document.createElement('a')
    const ctx = canvas.getContext('2d')

    const imageQuality = qualityInput.checked ? .5 : 1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(prevImage, 0, 0, canvas.width, canvas.height)
    a.href = canvas.toDataURL("image/jpeg", imageQuality)
    a.download = new Date().getTime()
    a.click()
}

downloadBtn.addEventListener('click', resizeDownload)
fileInput.addEventListener('change', loadFile)
upLoadBox.addEventListener('click', () => fileInput.click())