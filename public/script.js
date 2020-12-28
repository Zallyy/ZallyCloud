import { db, apiKey } from './config.js'

const readData = async () => {
    const res = await fetch(db, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            mode: 'cors',
            'secret-key': apiKey,
        },
    })
    const data = await res.json()
    return data
}

async function setImages() {
    const images = await readData()
    console.log(images)
    images.forEach((image) => {
        document.querySelector('.gallery').innerHTML += `
            <a href='./uploads/${image.fileName}'>
            <div class="gallery__image-container">
                <img loading="lazy" class="gallery__image" src='./uploads/${image.fileName}'>
            </div>
            </a>
        `
    })
}

setImages()
