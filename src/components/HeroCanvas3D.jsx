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
    camera.position.set(0, 15, 45)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentContainer.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const goldPointLight = new THREE.PointLight(0xd4af37, 3, 100)
    goldPointLight.position.set(20, 30, 20)
    scene.add(goldPointLight)

    const purpleDirectional = new THREE.DirectionalLight(0x9333ea, 1.5)
    purpleDirectional.position.set(-20, 20, 10)
    scene.add(purpleDirectional)

    const cityGroup = new THREE.Group()
    scene.add(cityGroup)

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    })

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.6,
      opacity: 0.8,
      transparent: true,
    })

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })

    const buildingCount = 18
    for (let i = 0; i < buildingCount; i++) {
      const height = Math.random() * 18 + 8
      const width = Math.random() * 4 + 3
      const depth = Math.random() * 4 + 3

      const geometry = new THREE.BoxGeometry(width, height, depth)
      const isGold = i % 3 === 0
      const mesh = new THREE.Mesh(geometry, isGold ? goldMaterial : glassMaterial)

      const angle = (i / buildingCount) * Math.PI * 2
      const radius = Math.random() * 12 + 10
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      mesh.position.set(x, height / 2 - 5, z)
      cityGroup.add(mesh)

      const wireMesh = new THREE.Mesh(geometry, wireframeMat)
      wireMesh.position.set(x, height / 2 - 5, z)
      cityGroup.add(wireMesh)
    }

    const particlesCount = 120
    const particlesGeo = new THREE.BufferGeometry()
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0xfcb900,
      transparent: true,
      opacity: 0.8,
    })
    const particleSystem = new THREE.Points(particlesGeo, particleMat)
    scene.add(particleSystem)

    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", handleMouseMove)

    const handleResize = () => {
      if (!currentContainer) return
      camera.aspect = currentContainer.clientWidth / currentContainer.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      cityGroup.rotation.y += 0.003
      particleSystem.rotation.y += 0.001

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
      camera.position.y += (-mouseY * 4 + 15 - camera.position.y) * 0.05
      camera.lookAt(0, 5, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
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
      <div ref={mountRef} className="w-full h-full opacity-70 dark:opacity-85" />
    </div>
  )
}

export default HeroCanvas3D
