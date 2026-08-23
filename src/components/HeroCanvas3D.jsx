import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export const HeroCanvas3D = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const currentContainer = mountRef.current
    if (!currentContainer) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      currentContainer.clientWidth / currentContainer.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 40)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentContainer.appendChild(renderer.domElement)

    // Subtle Gold Floating Sparkles Particles (NO blocky 3D buildings)
    const particlesCount = 180
    const particlesGeo = new THREE.BufferGeometry()
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 80
      posArray[i + 1] = (Math.random() - 0.5) * 50
      posArray[i + 2] = (Math.random() - 0.5) * 40
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.75,
    })
    const particleSystem = new THREE.Points(particlesGeo, particleMat)
    scene.add(particleSystem)

    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      particleSystem.rotation.y += 0.0008
      particleSystem.rotation.x += 0.0004
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!currentContainer) return
      camera.aspect = currentContainer.clientWidth / currentContainer.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div ref={mountRef} className="w-full h-full opacity-60" />
    </div>
  )
}

export default HeroCanvas3D
