"use client";
import { useState, useEffect, useRef, useCallback } from "react";

type NodeType = "trigger" | "data" | "logic" | "ai" | "action";
interface EdgeDef { id: string; d: string }
interface NodeDef { label: string; type: NodeType; leftPct: number; topPct: number; icon: string }
interface AnimStep { edgeIdx: number; completesNode: number }
interface Scene {
  label: string;
  description: string;
  edges: EdgeDef[];
  nodes: NodeDef[];
  steps: AnimStep[];
  initialCompleted: number[];
}

const ICONS: Record<string, string> = {
  docs:     "M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z",
  split:    "M238.78,183.79,98.28,87.65A40.18,40.18,0,0,0,100,76a40,40,0,1,0-15.29,31.45l30,20.56-30,20.56a40,40,0,1,0,3.57,59.74h0A39.73,39.73,0,0,0,100,180a40.18,40.18,0,0,0-1.72-11.66L136,142.54l89.22,61.06a12,12,0,0,0,13.56-19.81ZM71.31,191.33h0A16,16,0,1,1,76,180,16,16,0,0,1,71.31,191.33ZM48.69,87.3a16,16,0,1,1,22.62,0h0A16,16,0,0,1,48.69,87.3Zm112.82,23.24a12,12,0,0,1,3.13-16.68L225.22,52.4a12,12,0,0,1,13.56,19.81l-60.59,41.46a12,12,0,0,1-16.68-3.13Z",
  embed:    "M199,125.31l-49.88-18.39L130.69,57a19.92,19.92,0,0,0-37.38,0L74.92,106.92,25,125.31a19.92,19.92,0,0,0,0,37.38l49.88,18.39L93.31,231a19.92,19.92,0,0,0,37.38,0l18.39-49.88L199,162.69a19.92,19.92,0,0,0,0-37.38Zm-63.38,35.16a12,12,0,0,0-7.11,7.11L112,212.28l-16.47-44.7a12,12,0,0,0-7.11-7.11L43.72,144l44.7-16.47a12,12,0,0,0,7.11-7.11L112,75.72l16.47,44.7a12,12,0,0,0,7.11,7.11L180.28,144ZM140,40a12,12,0,0,1,12-12h12V16a12,12,0,0,1,24,0V28h12a12,12,0,0,1,0,24H188V64a12,12,0,0,1-24,0V52H152A12,12,0,0,1,140,40ZM252,88a12,12,0,0,1-12,12h-4v4a12,12,0,0,1-24,0v-4h-4a12,12,0,0,1,0-24h4V72a12,12,0,0,1,24,0v4h4A12,12,0,0,1,252,88Z",
  supabase: "M196,35.52C177.62,25.51,153.48,20,128,20S78.38,25.51,60,35.52C39.37,46.79,28,62.58,28,80v96c0,17.42,11.37,33.21,32,44.48,18.35,10,42.49,15.52,68,15.52s49.62-5.51,68-15.52c20.66-11.27,32-27.06,32-44.48V80C228,62.58,216.63,46.79,196,35.52ZM204,128c0,17-31.21,36-76,36s-76-19-76-36v-8.46a88.9,88.9,0,0,0,8,4.94c18.35,10,42.49,15.52,68,15.52s49.62-5.51,68-15.52a88.9,88.9,0,0,0,8-4.94ZM128,44c44.79,0,76,19,76,36s-31.21,36-76,36S52,97,52,80,83.21,44,128,44Zm0,168c-44.79,0-76-19-76-36v-8.46a88.9,88.9,0,0,0,8,4.94c18.35,10,42.49,15.52,68,15.52s49.62-5.51,68-15.52a88.9,88.9,0,0,0,8-4.94V176C204,193,172.79,212,128,212Z",
  question: "M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z",
  retrieve: "M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z",
  gemini:   "M72,104a16,16,0,1,1,16,16A16,16,0,0,1,72,104Zm96,16a16,16,0,1,0-16-16A16,16,0,0,0,168,120Zm68-40V192a36,36,0,0,1-36,36H56a36,36,0,0,1-36-36V80A36,36,0,0,1,56,44h60V16a12,12,0,0,1,24,0V44h60A36,36,0,0,1,236,80Zm-24,0a12,12,0,0,0-12-12H56A12,12,0,0,0,44,80V192a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12Zm-12,82a30,30,0,0,1-30,30H86a30,30,0,0,1,0-60h84A30,30,0,0,1,200,162Zm-80-6v12h16V156ZM86,168H96V156H86a6,6,0,0,0,0,12Zm90-6a6,6,0,0,0-6-6H160v12h10A6,6,0,0,0,176,162Z",
  answer:   "M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z",
  code:     "M71.68,97.22,34.74,128l36.94,30.78a12,12,0,1,1-15.36,18.44l-48-40a12,12,0,0,1,0-18.44l48-40A12,12,0,0,1,71.68,97.22Zm176,21.56-48-40a12,12,0,1,0-15.36,18.44L221.26,128l-36.94,30.78a12,12,0,1,0,15.36,18.44l48-40a12,12,0,0,0,0-18.44ZM164.1,28.72a12,12,0,0,0-15.38,7.18l-64,176a12,12,0,0,0,7.18,15.37A11.79,11.79,0,0,0,96,228a12,12,0,0,0,11.28-7.9l64-176A12,12,0,0,0,164.1,28.72Z",
  build:    "M250.18,105.17,186.71,41.25a100.11,100.11,0,0,0-141.43,0l-.13.14L31.37,55.61a12,12,0,1,0,17.24,16.7L62.32,58.16A75.68,75.68,0,0,1,77.49,46.43L119,88,25.85,181.16a20,20,0,0,0,0,28.29l20.69,20.69a20,20,0,0,0,28.28,0L168,137l1.51,1.51h0l23.65,23.66a20,20,0,0,0,28.29,0l28.69-28.7A20,20,0,0,0,250.18,105.17ZM60.68,210.34l-15-15L108,133l15,15ZM140,131l-15-15,19.51-19.51a12,12,0,0,0,0-17L102.24,37.24a75.94,75.94,0,0,1,67.47,20.95l31.44,31.67L178,113l-1.51-1.51a12,12,0,0,0-17,0Zm67.32,11.31L195,130l23.09-23.09,12.3,12.39Z",
  test:     "M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z",
  package:  "M225.6,62.64l-88-48.17a19.91,19.91,0,0,0-19.2,0l-88,48.17A20,20,0,0,0,20,80.19v95.62a20,20,0,0,0,10.4,17.55l88,48.17a19.89,19.89,0,0,0,19.2,0l88-48.17A20,20,0,0,0,236,175.81V80.19A20,20,0,0,0,225.6,62.64ZM128,36.57,200,76,178.57,87.73l-72-39.42Zm0,78.83L56,76,81.56,62l72,39.41ZM44,96.79l72,39.4v76.67L44,173.44Zm96,116.07V136.19l24-13.13V152a12,12,0,0,0,24,0V109.92l24-13.13v76.65Z",
  review:   "M251,123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63,57.67,164,44,128,44S59.37,57.67,33.51,83.52C14.16,102.87,5.4,122.32,5,123.13a12.08,12.08,0,0,0,0,9.75c.37.82,9.13,20.26,28.49,39.61C59.37,198.34,92,212,128,212s68.63-13.66,94.48-39.51c19.36-19.35,28.12-38.79,28.49-39.61A12.08,12.08,0,0,0,251,123.13Zm-46.06,33C183.47,177.27,157.59,188,128,188s-55.47-10.73-76.91-31.88A130.36,130.36,0,0,1,29.52,128,130.45,130.45,0,0,1,51.09,99.89C72.54,78.73,98.41,68,128,68s55.46,10.73,76.91,31.89A130.36,130.36,0,0,1,226.48,128,130.45,130.45,0,0,1,204.91,156.12ZM128,84a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,84Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,148Z",
  stage:    "M208,36H48A28,28,0,0,0,20,64V172a28,28,0,0,0,28,28h68v12H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24H140V200h68a28,28,0,0,0,28-28V64A28,28,0,0,0,208,36ZM48,60H208a4,4,0,0,1,4,4v72H44V64A4,4,0,0,1,48,60ZM208,176H48a4,4,0,0,1-4-4V160H212v12A4,4,0,0,1,208,176Z",
  deploy:   "M227.85,46.89a20,20,0,0,0-18.74-18.74c-13.13-.77-46.65.42-74.48,28.24L131,60H74.36a19.83,19.83,0,0,0-14.14,5.86L25.87,100.19a20,20,0,0,0,11.35,33.95l37.14,5.18,42.32,42.32,5.19,37.18A19.88,19.88,0,0,0,135.34,235a20.13,20.13,0,0,0,6.37,1,19.9,19.9,0,0,0,14.1-5.87l34.34-34.35A19.85,19.85,0,0,0,196,181.64V125l3.6-3.59C227.43,93.54,228.62,60,227.85,46.89ZM76,84h31L75.75,115.28l-27.23-3.8ZM151.6,73.37A72.27,72.27,0,0,1,204,52a72.17,72.17,0,0,1-21.38,52.41L128,159,97,128ZM172,180l-27.49,27.49-3.8-27.23L172,149Zm-72,22c-8.71,11.85-26.19,26-60,26a12,12,0,0,1-12-12c0-33.84,14.12-51.32,26-60A12,12,0,1,1,68.18,175.3C62.3,179.63,55.51,187.8,53,203c15.21-2.51,23.37-9.3,27.7-15.18A12,12,0,1,1,100,202Z",
  live:     "M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,187a113.4,113.4,0,0,1-20.39-35h40.82a116.94,116.94,0,0,1-10,20.77A108.61,108.61,0,0,1,128,207Zm-26.49-59a135.42,135.42,0,0,1,0-40h53a135.42,135.42,0,0,1,0,40ZM44,128a83.49,83.49,0,0,1,2.43-20H77.25a160.63,160.63,0,0,0,0,40H46.43A83.49,83.49,0,0,1,44,128Zm84-79a113.4,113.4,0,0,1,20.39,35H107.59a116.94,116.94,0,0,1,10-20.77A108.61,108.61,0,0,1,128,49Zm50.73,59h30.82a83.52,83.52,0,0,1,0,40H178.75a160.63,160.63,0,0,0,0-40Zm20.77-24H173.71a140.82,140.82,0,0,0-15.5-34.36A84.51,84.51,0,0,1,199.52,84ZM97.79,49.64A140.82,140.82,0,0,0,82.29,84H56.48A84.51,84.51,0,0,1,97.79,49.64ZM56.48,172H82.29a140.82,140.82,0,0,0,15.5,34.36A84.51,84.51,0,0,1,56.48,172Zm101.73,34.36A140.82,140.82,0,0,0,173.71,172h25.81A84.51,84.51,0,0,1,158.21,206.36Z",
};

const TRACE_TOP    = "M 1 18 L 1 8 Q 1 1 8 1 L 92 1 Q 99 1 99 8 L 99 18";
const TRACE_BOTTOM = "M 1 18 L 1 28 Q 1 35 8 35 L 92 35 Q 99 35 99 28 L 99 18";

const SCENES: Scene[] = [
  {
    label: "Automation",
    description: "Documents go in — AI-powered answers come out. A RAG pipeline that ingests your content, embeds it into a vector store, and retrieves the right context for any question. The same pattern powers AI chatbots, knowledge bases, and smart document search.",
    edges: [
      { id: "edge-auto-n1-n2", d: "M 114.45 88.32 C 136.435 88.32 136.435 88.32 158.42 88.32" },
      { id: "edge-auto-n2-n3", d: "M 241.99 88.32 C 263.98 88.32 263.98 88.32 285.97 88.32" },
      { id: "edge-auto-n3-n4", d: "M 369.54 88.32 C 389.655 88.32 389.655 88.32 409.77 88.32" },
      { id: "edge-auto-n5-n6", d: "M 115.88 201.54 C 137.15 201.54 137.15 201.54 158.42 201.54" },
      { id: "edge-auto-n6-n7", d: "M 241.99 201.54 C 263.98 201.54 263.98 201.54 285.97 201.54" },
      { id: "edge-auto-n7-n8", d: "M 369.54 201.54 C 391.52 201.54 391.52 201.54 413.5 201.54" },
      { id: "edge-auto-n4-n6", d: "M 455.29 101.78 C 455.29 144.925 200.21 144.925 200.21 188.07" },
    ],
    nodes: [
      { label: "Docs",     type: "data",    leftPct: 13.846, topPct: 32.593, icon: "docs"     },
      { label: "Split",    type: "logic",   leftPct: 38.462, topPct: 32.593, icon: "split"    },
      { label: "Embed",    type: "ai",      leftPct: 63.077, topPct: 32.593, icon: "embed"    },
      { label: "Storage", type: "data",    leftPct: 87.692, topPct: 32.593, icon: "supabase" },
      { label: "Question", type: "trigger", leftPct: 13.846, topPct: 74.815, icon: "question" },
      { label: "Retrieve", type: "logic",   leftPct: 38.462, topPct: 74.815, icon: "retrieve" },
      { label: "LLM",   type: "ai",      leftPct: 63.077, topPct: 74.815, icon: "gemini"   },
      { label: "Answer",   type: "action",  leftPct: 87.692, topPct: 74.815, icon: "answer"   },
    ],
    // Orb travels: Docs→Split→Embed→Supabase, then cross to Retrieve, then bottom row
    steps: [
      { edgeIdx: 0, completesNode: 1 },  // →Split
      { edgeIdx: 1, completesNode: 2 },  // →Embed
      { edgeIdx: 2, completesNode: 3 },  // →Supabase
      { edgeIdx: 6, completesNode: 5 },  // Supabase→Retrieve (cross)
      { edgeIdx: 3, completesNode: 4 },  // Question→Retrieve (triggers query; mark Question done)
      { edgeIdx: 4, completesNode: 6 },  // →Gemini
      { edgeIdx: 5, completesNode: 7 },  // →Answer
    ],
    initialCompleted: [0], // Docs starts lit
  },
  {
    label: "App Development",
    description: "A real CI/CD pipeline — from code to live. Write it (or vibe-code it with AI), build and test automatically, package the artifact, stage it for review, then deploy. The same flow powers every app I ship, regardless of how the code gets written.",
    edges: [
      { id: "edge-appdev-n1-n2", d: "M 114.45 88.32 C 136.435 88.32 136.435 88.32 158.42 88.32" },
      { id: "edge-appdev-n2-n3", d: "M 241.99 88.32 C 263.98 88.32 263.98 88.32 285.97 88.32" },
      { id: "edge-appdev-n3-n4", d: "M 369.54 88.32 C 391.235 88.32 391.235 88.32 412.93 88.32" },
      { id: "edge-appdev-n5-n6", d: "M 114.45 201.54 C 136.435 201.54 136.435 201.54 158.42 201.54" },
      { id: "edge-appdev-n6-n7", d: "M 241.99 201.54 C 263.98 201.54 263.98 201.54 285.97 201.54" },
      { id: "edge-appdev-n7-n8", d: "M 369.54 201.54 C 391.52 201.54 391.52 201.54 413.5 201.54" },
      { id: "edge-appdev-n4-n6", d: "M 455.29 101.78 C 455.29 144.925 200.21 144.925 200.21 188.07" },
    ],
    nodes: [
      { label: "Code",    type: "trigger", leftPct: 13.846, topPct: 32.593, icon: "code"    },
      { label: "Build",   type: "logic",   leftPct: 38.462, topPct: 32.593, icon: "build"   },
      { label: "Test",    type: "logic",   leftPct: 63.077, topPct: 32.593, icon: "test"    },
      { label: "Package", type: "data",    leftPct: 87.692, topPct: 32.593, icon: "package" },
      { label: "Review",  type: "logic",   leftPct: 13.846, topPct: 74.815, icon: "review"  },
      { label: "Stage",   type: "logic",   leftPct: 38.462, topPct: 74.815, icon: "stage"   },
      { label: "Deploy",  type: "action",  leftPct: 63.077, topPct: 74.815, icon: "deploy"  },
      { label: "Live",    type: "action",  leftPct: 87.692, topPct: 74.815, icon: "live"    },
    ],
    steps: [
      { edgeIdx: 0, completesNode: 1 },  // →Build
      { edgeIdx: 1, completesNode: 2 },  // →Test
      { edgeIdx: 2, completesNode: 3 },  // →Package
      { edgeIdx: 6, completesNode: 5 },  // Package→Stage (cross)
      { edgeIdx: 3, completesNode: 4 },  // Review→Stage (mark Review done as it approves)
      { edgeIdx: 4, completesNode: 6 },  // →Deploy
      { edgeIdx: 5, completesNode: 7 },  // →Live
    ],
    initialCompleted: [0], // Code starts lit
  },
];

export default function FlowPipeline() {
  const [activeTab, setActiveTab] = useState(0);
  const [completedSet, setCompletedSet] = useState<Set<number>>(
    () => new Set(SCENES[0].initialCompleted)
  );

  // Direct ref on <animateMotion> — avoids querySelector case-sensitivity issues
  const animMotionRef = useRef<SVGAnimationElement>(null);

  const fire = useCallback((tab: number, stepIdx: number) => {
    const orb = animMotionRef.current;
    if (!orb) return;
    const scene = SCENES[tab];
    if (stepIdx >= scene.steps.length) return;
    const edgeId = scene.edges[scene.steps[stepIdx].edgeIdx].id;
    const mp = orb.querySelector("mpath");
    if (mp) mp.setAttribute("href", `#${edgeId}`);
    try { orb.beginElement(); } catch (_) {}
  }, []);

  // One effect per tab that owns its own step counter and endEvent listener.
  // Returning cleanup removes the listener when tab changes — no stale closures.
  useEffect(() => {
    const scene = SCENES[activeTab];
    setCompletedSet(new Set(scene.initialCompleted));

    const orb = animMotionRef.current;
    if (!orb) return;

    let step = 0;

    const onEnd = () => {
      if (step >= scene.steps.length) return;

      // Light up the destination node
      const { completesNode } = scene.steps[step];
      setCompletedSet(prev => new Set([...prev, completesNode]));
      step++;

      if (step < scene.steps.length) {
        // Short pause then travel the next edge
        setTimeout(() => fire(activeTab, step), 350);
      } else {
        // All nodes lit — pause then reset and loop
        setTimeout(() => {
          setCompletedSet(new Set(scene.initialCompleted));
          step = 0;
          setTimeout(() => fire(activeTab, step), 400);
        }, 1400);
      }
    };

    orb.addEventListener("endEvent", onEnd);
    const t = setTimeout(() => fire(activeTab, step), 700);

    return () => {
      orb.removeEventListener("endEvent", onEnd);
      clearTimeout(t);
    };
  }, [activeTab, fire]);

  return (
    <div className="hero-flow" role="group" aria-label="What I build — automation and app-development workflows">
      <p className="flow-heading">Production pipeline</p>

      <div className="flow-tabs" role="group" aria-label="Switch graph">
        {SCENES.map((scene, i) => (
          <button
            key={scene.label}
            type="button"
            aria-pressed={activeTab === i}
            className={`flow-tab${activeTab === i ? " active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {scene.label}
          </button>
        ))}
      </div>

      <div className="flow-stage">
        {/* SVG layer: edges + orb */}
        <svg className="flow-lines" viewBox="0 0 520 270" aria-hidden="true">
          {SCENES.map((scene, si) => (
            <g key={scene.label} className="flow-scene" style={{ opacity: activeTab === si ? 1 : 0 }}>
              {scene.edges.map(edge => (
                <path key={edge.id} id={edge.id} className="flow-edge" d={edge.d} />
              ))}
            </g>
          ))}

          <g className="flow-orb" aria-hidden="true">
            <circle className="flow-orb-halo" r={8} />
            <circle className="flow-orb-core" r={3.4} />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <animateMotion ref={animMotionRef as any} begin="indefinite" dur="900ms" fill="freeze" rotate="auto">
              <mpath href={`#${SCENES[activeTab].edges[SCENES[activeTab].steps[0].edgeIdx].id}`} />
            </animateMotion>
          </g>
        </svg>

        {/* HTML node overlays */}
        {SCENES.map((scene, si) => (
          <div
            key={scene.label}
            className="flow-nodes"
            style={{
              opacity: activeTab === si ? 1 : 0,
              pointerEvents: activeTab === si ? "auto" : "none",
            }}
            aria-hidden={activeTab !== si}
          >
            {scene.nodes.map((node, ni) => (
              <div
                key={ni}
                className={`flow-node flow-node--${node.type}${completedSet.has(ni) ? " is-completed" : ""}`}
                style={{
                  left: `${node.leftPct}%`,
                  top: `${node.topPct}%`,
                  "--flow-node-sweep-ms": "600ms",
                } as React.CSSProperties}
              >
                <svg className="flow-node-trace" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
                  <path className="flow-node-trace-path flow-node-trace-path--top"    pathLength={1} d={TRACE_TOP} />
                  <path className="flow-node-trace-path flow-node-trace-path--bottom" pathLength={1} d={TRACE_BOTTOM} />
                </svg>
                <span className="flow-node-port flow-node-port--start" aria-hidden="true" />
                <span className="flow-node-ic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 256 256">
                    <path d={ICONS[node.icon]} />
                  </svg>
                </span>
                <span className="flow-node-lbl">{node.label}</span>
                <span className="flow-node-port flow-node-port--end" aria-hidden="true" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flow-desc-wrap">
        {SCENES.map((scene, si) => (
          <p
            key={scene.label}
            className="flow-desc"
            style={{ opacity: activeTab === si ? 1 : 0 }}
            aria-hidden={activeTab !== si}
          >
            {scene.description}
          </p>
        ))}
      </div>
    </div>
  );
}