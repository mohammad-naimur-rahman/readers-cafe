/* eslint-disable prefer-promise-reject-errors  */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
export function getColor(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // To enable cross-origin image access
    img.src = imageUrl

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      const colors = {}

      // Sample colors from the image
      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i]
        const green = imageData[i + 1]
        const blue = imageData[i + 2]
        const alpha = imageData[i + 3]

        // Exclude fully transparent pixels
        if (alpha > 0) {
          const hex = `#${((1 << 24) | (red << 16) | (green << 8) | blue)
            .toString(16)
            .slice(1)}`

          if (!colors[hex]) {
            colors[hex] = 0
          }
          colors[hex]++
        }
      }

      // Find the dominant color
      let maxCount = 0
      let dominantColor = null
      for (const color in colors) {
        if (colors[color] > maxCount) {
          maxCount = colors[color]
          dominantColor = color
        }
      }

      if (dominantColor) {
        resolve(dominantColor)
      } else {
        reject('No dominant color found')
      }
    }

    img.onerror = error => {
      reject(error)
    }
  })
}
