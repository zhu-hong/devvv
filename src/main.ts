import 'uno.css'
import '@unocss/reset/tailwind.css'
import thumbnails from './thumbnails.jpg'

import DPlayer from 'dplayer'

document.getElementById('video_uploader')?.addEventListener('change', (e: Event) => {
  // @ts-ignore
  const file = e.target.files[0]

  // @ts-ignore
  const blobURL: string = URL.createObjectURL(file)

  console.log(blobURL)

  const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    screenshot: true,
    video: {
      url: blobURL,
      thumbnails,
    },
  })

  dp.play()
})
