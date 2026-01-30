import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FolderOpen, Briefcase, FileText, GraduationCap, Award, Users, Share2, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoomCard from '@/components/RoomCard';

const SECTIONS = [
  { key: 'projects', title: 'Projects - Roof Section', path: '/projects' },
  { key: 'experience', title: 'Experience - Foundation', path: '/experience' },
  { key: 'cv', title: 'CV - Blueprint', path: '/cv' },
  { key: 'courses', title: 'Courses - Library', path: '/courses' },
  { key: 'transcript', title: 'Transcript - Records', path: '/transcript' },
  { key: 'leadership', title: 'Leadership - Meeting Room', path: '/leadership' },
  { key: 'social', title: 'Social Media - Windows', path: '/social' },
  { key: 'contact', title: 'Contact - Door', path: '/contact' },
] as const;

const rooms = [
  { title: 'Projects', description: 'The Roof - Showcasing my best work', teaser: 'Explore innovative projects spanning AI, web development, and 3D visualization.', icon: FolderOpen, to: '/projects' },
  { title: 'Experience', description: 'The Foundation - Professional journey', teaser: 'A timeline of roles that built my expertise in technology and leadership.', icon: Briefcase, to: '/experience' },
  { title: 'CV', description: 'The Blueprint - Complete overview', teaser: 'Education, skills, and work history compiled in a structured format.', icon: FileText, to: '/cv' },
  { title: 'Courses', description: 'The Library - Continuous learning', teaser: 'Certifications and courses that keep my knowledge current.', icon: GraduationCap, to: '/courses' },
  { title: 'Transcript', description: 'The Records - Academic achievements', teaser: 'Detailed academic performance and grades.', icon: Award, to: '/transcript' },
  { title: 'Leadership', description: 'The Meeting Room - Leadership roles', teaser: 'Positions where I led teams and drove organizational change.', icon: Users, to: '/leadership' },
  { title: 'Social Media', description: 'The Windows - Connect with me', teaser: 'Find me on professional platforms and social networks.', icon: Share2, to: '/social' },
  { title: 'Contact', description: 'The Door - Get in touch', teaser: 'Ready to collaborate? Reach out through the contact form.', icon: Mail, to: '/contact' },
];

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<{ show: boolean; title: string; x: number; y: number }>({
    show: false,
    title: '',
    x: 0,
    y: 0,
  });

  const scrollToRooms = () => {
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let mixer: THREE.AnimationMixer | null = null;
    let clock: THREE.Clock;
    let animationId: number;
    let sectionMeshes: THREE.Object3D[] = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Scene
    scene = new THREE.Scene();

    // Camera – position to view entire model
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 100;

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 50, 100);
    scene.add(dirLight);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    clock = new THREE.Clock();

    // Load LittlestTokyo.glb
    const loader = new GLTFLoader();
    loader.load(
      'https://threejs.org/examples/models/gltf/LittlestTokyo.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, 0);
        scene.add(model);

        // Assign meshes to sections (round-robin)
        const meshes: THREE.Mesh[] = [];
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            meshes.push(child as THREE.Mesh);
          }
        });
        meshes.forEach((mesh, i) => {
          const section = SECTIONS[i % SECTIONS.length];
          (mesh as THREE.Mesh & { userData: Record<string, unknown> }).userData.sectionKey = section.key;
          (mesh as THREE.Mesh & { userData: Record<string, unknown> }).userData.sectionPath = section.path;
          (mesh as THREE.Mesh & { userData: Record<string, unknown> }).userData.sectionTitle = section.title;
          sectionMeshes.push(mesh);
        });

        // Animation
        if (gltf.animations?.length) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixer!.clipAction(clip).setLoop(THREE.LoopRepeat).play();
          });
        }
      },
      undefined,
      (err) => {
        console.error('GLTFLoader loading error:', err);
      }
    );

    // Mouse move – raycaster hover
    const onPointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sectionMeshes, true);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        const ud = (obj as THREE.Object3D & { userData: Record<string, unknown> }).userData;
        const title = ud.sectionTitle as string | undefined;
        if (title) {
          setTooltip({ show: true, title, x: e.clientX, y: e.clientY });
          containerRef.current.style.cursor = 'pointer';
          return;
        }
      }
      setTooltip((t) => (t.show ? { ...t, show: false } : t));
      if (containerRef.current) containerRef.current.style.cursor = 'grab';
    };

    const onPointerDown = () => {
      if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
    };
    const onPointerUp = () => {
      if (containerRef.current) containerRef.current.style.cursor = 'grab';
    };

    const onPointerLeave = () => setTooltip((t) => (t.show ? { ...t, show: false } : t));

    const onPointerClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sectionMeshes, true);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        const path = (obj as THREE.Object3D & { userData: Record<string, unknown> }).userData.sectionPath as string | undefined;
        if (path) navigate(path);
      }
    };

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('click', onPointerClick);
    window.addEventListener('resize', onResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      if (mixer) mixer.update(dt);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('click', onPointerClick);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 nvidia-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

        {/* 3D Viewer – Three.js canvas container */}
        <div className="relative w-full max-w-4xl mb-12 animate-fade-in overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-nvidia">
          <div ref={containerRef} className="w-full h-[500px]" />

          {/* Fallback label (hidden when canvas is active) */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <p className="text-muted-foreground/80 text-xs">
              Drag to rotate · Scroll to zoom · Click a part to open a section
            </p>
          </div>

          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br" />
        </div>

        {/* 2D Tooltip near mouse */}
        {tooltip.show && (
          <div
            className="fixed z-50 px-3 py-2 rounded-md border border-border bg-popover text-popover-foreground text-sm shadow-lg animate-in fade-in-0 zoom-in-95 duration-150 pointer-events-none"
            style={{
              left: tooltip.x + 12,
              top: tooltip.y + 12,
              transform: 'translate(0, 0)',
            }}
          >
            <span className="text-primary font-medium">{tooltip.title}</span>
          </div>
        )}

        {/* Intro Text */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient-green mb-6">
            Explore My Portfolio as an Interactive House
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Each section represents a room in this digital architecture.
            The <span className="text-primary font-semibold">Roof</span> showcases projects,
            the <span className="text-primary font-semibold">Foundation</span> holds experience,
            and every room tells a story of growth and innovation.
          </p>
          <Button variant="hero" size="xl" onClick={scrollToRooms} className="group">
            Enter the House
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Rooms Grid Section */}
      <section id="rooms" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Navigate the <span className="text-primary">Rooms</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each room contains a unique aspect of my professional journey.
              Hover over a card to preview, click to explore.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room, index) => (
              <RoomCard key={room.to} {...room} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
