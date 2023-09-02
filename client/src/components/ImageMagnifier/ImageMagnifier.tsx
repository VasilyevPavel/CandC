import React, { useState } from "react"

function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 4,
}) {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)

  const isMobileOrTablet =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

  const handleMouseEnter = (e) => {
    if (!isMobileOrTablet) {
      const elem = e.currentTarget
      const { width, height } = elem.getBoundingClientRect()
      setSize([width, height])
      setShowMagnifier(true)
    }
  }

  const handleMouseMove = (e) => {
    if (!isMobileOrTablet) {
      const elem = e.currentTarget
      const { top, left } = elem.getBoundingClientRect()

      const x = e.pageX - left - window.pageXOffset
      const y = e.pageY - top - window.pageYOffset
      setXY([x, y])
    }
  }

  const handleMouseLeave = () => {
    if (!isMobileOrTablet) {
      setShowMagnifier(false)
    }
  }

  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
          borderRadius: "5px",
        }}
        alt="img"
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  )
}

export default ImageMagnifier
