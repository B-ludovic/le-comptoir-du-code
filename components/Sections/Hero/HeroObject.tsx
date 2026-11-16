'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

/* L'objet du hero : un galet terracotta rendu en WebGL natif, sans Three.js.

   Une bibliothèque 3D pèse plus de 100 Ko compressés pour un seul objet ;
   ce fichier tient en un shader. Le rendu est un raymarching : pour chaque
   pixel, on avance le long du rayon jusqu'à toucher la surface. La forme est
   une sphère déformée par un bruit lent, et attirée vers la souris.

   Garde-fous :
   — densité de pixels plafonnée à 1,5, le coût du shader est proportionnel au
     nombre de pixels ;
   — boucle en pause quand le hero sort de l'écran ou que l'onglet est masqué ;
   — repli sur une forme CSS fixe si WebGL manque, si le shader ne compile pas
     ou si le contexte est perdu ;
   — en mouvement réduit, le temps est figé : seule la souris déplace la
     lumière, ce qui reste un mouvement voulu par le visiteur. */

const VERTEX = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}'

const FRAGMENT = `
precision highp float;
uniform vec2 r;
uniform float t;
uniform vec2 m;
uniform float h;
mat3 R;

mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.0,-s,0.0,1.0,0.0,s,0.0,c);}
mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.0,0.0,0.0,0.0,c,s,0.0,-s,c);}

float map(vec3 p){
  vec3 q=R*p;
  float d=length(q)-1.0;
  d+=0.085*sin(2.6*q.x+t*0.7)*sin(2.9*q.y+t*0.55)*sin(2.3*q.z+t*0.8);
  vec3 md=normalize(vec3(m.x,m.y,0.85));
  d-=0.16*pow(max(dot(normalize(p),md),0.0),3.0);
  return d;
}

vec3 nrm(vec3 p){
  vec2 e=vec2(0.0015,0.0);
  return normalize(vec3(
    map(p+e.xyy)-map(p-e.xyy),
    map(p+e.yxy)-map(p-e.yxy),
    map(p+e.yyx)-map(p-e.yyx)));
}

float gridLine(float x){float f=abs(fract(x)-0.5);return 1.0-smoothstep(0.0,0.04,0.5-f);}

void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*r)/min(r.x,r.y);
  R=rotY(t*0.18+m.x*0.7)*rotX(-m.y*0.45+0.2);
  vec3 ro=vec3(0.0,0.0,3.2);
  vec3 rd=normalize(vec3(uv,-1.1));
  float d0=0.0;
  bool hit=false;
  vec3 p=ro;
  for(int i=0;i<80;i++){
    p=ro+rd*d0;
    float d=map(p);
    if(d<0.001){hit=true;break;}
    d0+=d*0.7;
    if(d0>6.0)break;
  }
  if(!hit){gl_FragColor=vec4(0.0);return;}

  vec3 n=nrm(p);
  vec3 L=normalize(vec3(0.55+m.x*0.9,0.75+m.y*0.7,0.9));
  float dif=max(dot(n,L),0.0);
  float amb=0.5+0.5*n.y;
  vec3 V=-rd;
  vec3 H=normalize(L+V);
  float spe=pow(max(dot(n,H),0.0),28.0);
  float rim=pow(1.0-max(dot(n,V),0.0),2.5);

  vec3 deep=vec3(0.580,0.251,0.122);
  vec3 base=vec3(0.643,0.290,0.157);
  vec3 soft=vec3(0.851,0.467,0.310);
  vec3 cream=vec3(0.965,0.941,0.902);
  vec3 col=mix(deep,base,amb*0.8);
  col=mix(col,soft,dif*0.85);
  col+=cream*spe*0.35;
  col=mix(col,cream,rim*0.18);

  vec3 s=normalize(R*p);
  float lat=acos(clamp(s.y,-1.0,1.0))/3.14159*10.0;
  float lon=(atan(s.z,s.x)/6.28318+0.5)*20.0;
  float g=max(gridLine(lat),gridLine(lon));
  col=mix(col,vec3(0.910,0.769,0.627),g*h*0.85);

  gl_FragColor=vec4(col,1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? 'shader')
  }
  return shader
}

export default function HeroObject() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoverTarget = useRef(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true })
    if (!gl) {
      setFailed(true)
      return
    }

    let program: WebGLProgram
    try {
      program = gl.createProgram() as WebGLProgram
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link')
    } catch {
      setFailed(true)
      return
    }

    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const position = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'r')
    const uTime = gl.getUniformLocation(program, 't')
    const uMouse = gl.getUniformLocation(program, 'm')
    const uHover = gl.getUniformLocation(program, 'h')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    /* Position de la souris rapportée au centre de l'objet, normalisée sur la
       demi-fenêtre : l'objet réagit au curseur partout dans le premier écran,
       pas seulement quand on le survole. */
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      const x = (event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2)
      const y = (box.top + box.height / 2 - event.clientY) / (window.innerHeight / 2)
      target.x = Math.max(-1, Math.min(1, x))
      target.y = Math.max(-1, Math.min(1, y))
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let onScreen = true
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
    })
    visibility.observe(canvas)

    const onLost = (event: Event) => {
      event.preventDefault()
      setFailed(true)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let hover = 0
    let frame = 0

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw)
      if (document.hidden || !onScreen) return

      current.x += (target.x - current.x) * 0.06
      current.y += (target.y - current.y) * 0.06
      hover += (hoverTarget.current - hover) * 0.08

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000)
      gl.uniform2f(uMouse, current.x, current.y)
      gl.uniform1f(uHover, hover)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('webglcontextlost', onLost)
      resizeObserver.disconnect()
      visibility.disconnect()
    }
  }, [])

  return (
    <div
      className={styles.stage}
      onPointerEnter={() => {
        hoverTarget.current = 1
      }}
      onPointerLeave={() => {
        hoverTarget.current = 0
      }}
    >
      {failed ? (
        <div className={styles.fallback} aria-hidden="true" />
      ) : (
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      )}
    </div>
  )
}
