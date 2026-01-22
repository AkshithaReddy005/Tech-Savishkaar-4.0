import React from 'react'

export type HexagonGalleryProps = {
  images: string[]
  title?: string
  className?: string
  onImageClick?: (src: string, index: number) => void
}

/**
 * HexagonGallery
 * - Standalone component to render a responsive hexagon grid of images
 * - No dependency on the main page; mount wherever you like
 * - Accessible: images have alt text derived from filename
 */
export default function HexagonGallery({ images, title, className = '', onImageClick }: HexagonGalleryProps) {
  return (
    <section className={`hex-gallery-section ${className}`.trim()}>
      {title && <h2 className="section-title hex-gallery-title">{title}</h2>}
      <div className="hex-grid" role="list">
        {images.map((src, idx) => {
          const alt = src.split('/').pop()?.replace(/[-_]/g, ' ').replace(/\.[a-zA-Z0-9]+$/, '') || `image-${idx}`
          return (
            <button
              key={src + idx}
              type="button"
              className="hex"
              onClick={() => onImageClick?.(src, idx)}
              aria-label={`Preview ${alt}`}
            >
              <div className="hex-in">
                <div className="hex-img" style={{ backgroundImage: `url(${src})` }} />
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
