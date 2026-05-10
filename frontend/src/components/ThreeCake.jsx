import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCake({ blown }) {
  const mount = useRef(null)
  useEffect(() => {
    const current = mount.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, current.clientWidth / current.clientHeight, .1, 100)
    camera.position.set(0, 2.2, 7)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(current.clientWidth, current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    current.appendChild(renderer.domElement)
    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const light = new THREE.PointLight(0xff7ab6, 3, 20); light.position.set(3, 5, 5); scene.add(light)
    const group = new THREE.Group(); scene.add(group)
    const cake = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.2, 1.2, 80), new THREE.MeshStandardMaterial({ color: 0xff9fc8, roughness: .38, metalness: .05 }))
    group.add(cake)
    const frosting = new THREE.Mesh(new THREE.CylinderGeometry(2.04, 2.04, .18, 80), new THREE.MeshStandardMaterial({ color: 0xffeff8, roughness: .28 }))
    frosting.position.y = .68; group.add(frosting)
    for (let i = -1; i <= 1; i++) {
      const candle = new THREE.Mesh(new THREE.CylinderGeometry(.08, .08, .9, 24), new THREE.MeshStandardMaterial({ color: i === 0 ? 0x9b8cff : 0xffffff }))
      candle.position.set(i * .55, 1.25, 0); group.add(candle)
      const flame = new THREE.Mesh(new THREE.SphereGeometry(.16, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: blown ? 0 : 1 }))
      flame.name = 'flame'; flame.scale.y = 1.55; flame.position.set(i * .55, 1.85, 0); group.add(flame)
    }
    let frame
    const animate = () => { frame = requestAnimationFrame(animate); group.rotation.y += .006; group.position.y = Math.sin(Date.now() * .001) * .08; group.children.filter((c) => c.name === 'flame').forEach((f, idx) => { f.scale.setScalar(.9 + Math.sin(Date.now() * .01 + idx) * .12); f.scale.y *= 1.55; f.material.opacity = blown ? Math.max(0, f.material.opacity - .06) : 1 }); renderer.render(scene, camera) }
    animate()
    const resize = () => { camera.aspect = current.clientWidth / current.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(current.clientWidth, current.clientHeight) }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); current.removeChild(renderer.domElement); renderer.dispose() }
  }, [blown])
  return <div ref={mount} className="h-[320px] w-full md:h-[440px]" />
}
