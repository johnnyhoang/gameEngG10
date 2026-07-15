import { create } from 'zustand';
import type { PlaneScene, PlaneTool, PlaneLessonStep } from '../utils/planeMath';
import { createDefaultScene, BOARD_WIDTH, BOARD_HEIGHT } from '../utils/planeMath';
import type { ShapeKind, CommandHistoryItem } from '../utils/solidMath';
import { VIEW_PRESETS } from '../utils/solidMath';


interface GeometryState {
  // --- General ---
  dimension: '2d' | '3d';
  setDimension: (dim: '2d' | '3d') => void;

  // --- 2D Plane Geometry State ---
  planeScene: PlaneScene;
  planeTool: PlaneTool;
  selectedPointId2D: string | null;
  history2D: string[];
  lessonSteps2D: PlaneLessonStep[];
  viewport2D: { x: number; y: number; width: number; height: number };
  currentStep2D: number;
  maxStep2D: number;
  dragPointId2D: string | null;
  isPanning2D: boolean;
  panAnchor2D: { clientX: number; clientY: number; viewport: { x: number; y: number; width: number; height: number } } | null;
  analysisStatus2D: 'idle' | 'loading' | 'success' | 'error';
  analysisError2D: string;

  setPlaneScene: (scene: PlaneScene | ((prev: PlaneScene) => PlaneScene)) => void;
  setPlaneTool: (tool: PlaneTool) => void;
  setSelectedPointId2D: (id: string | null) => void;
  setHistory2D: (history: string[] | ((prev: string[]) => string[])) => void;
  setLessonSteps2D: (steps: PlaneLessonStep[] | ((prev: PlaneLessonStep[]) => PlaneLessonStep[])) => void;
  setViewport2D: (viewport: typeof VIEW_PRESETS.iso | any | ((prev: any) => any)) => void;
  setCurrentStep2D: (step: number | ((prev: number) => number)) => void;
  setMaxStep2D: (step: number) => void;
  setDragPointId2D: (id: string | null) => void;
  setIsPanning2D: (panning: boolean) => void;
  setPanAnchor2D: (anchor: any | null) => void;
  setAnalysisStatus2D: (status: 'idle' | 'loading' | 'success' | 'error') => void;
  setAnalysisError2D: (error: string) => void;

  // --- 3D Solid Geometry State ---
  manualShape3D: ShapeKind;
  autoResolve3D: boolean;
  yaw3D: number;
  pitch3D: number;
  roll3D: number;
  zoom3D: number;
  panX3D: number;
  panY3D: number;
  history3D: CommandHistoryItem[];
  activeStepIndex3D: number;
  isPlaying3D: boolean;
  boardTool3D: 'ai' | 'vertex-vertex' | 'vertex-edge' | 'perpendicular' | 'plane-3p';
  pickedVertex3D: string | null;
  pickedVertices3D: string[];
  analysisStatus3D: 'idle' | 'loading' | 'error' | 'success';
  analysisError3D: string;

  setManualShape3D: (shape: ShapeKind) => void;
  setAutoResolve3D: (auto: boolean) => void;
  setYaw3D: (yaw: number) => void;
  setPitch3D: (pitch: number) => void;
  setRoll3D: (roll: number) => void;
  setZoom3D: (zoom: number) => void;
  setPanX3D: (x: number) => void;
  setPanY3D: (y: number) => void;
  setHistory3D: (history: CommandHistoryItem[] | ((prev: CommandHistoryItem[]) => CommandHistoryItem[])) => void;
  setActiveStepIndex3D: (index: number | ((prev: number) => number)) => void;
  setIsPlaying3D: (playing: boolean) => void;
  setBoardTool3D: (tool: 'ai' | 'vertex-vertex' | 'vertex-edge' | 'perpendicular' | 'plane-3p') => void;
  setPickedVertex3D: (vertex: string | null) => void;
  setPickedVertices3D: (vertices: string[] | ((prev: string[]) => string[])) => void;
  setAnalysisStatus3D: (status: 'idle' | 'loading' | 'error' | 'success') => void;
  setAnalysisError3D: (error: string) => void;

  // --- Common Actions ---
  resetStore: () => void;
}

const defaultPlaneScene = createDefaultScene('triangle');

export const useGeometryState = create<GeometryState>((set) => ({
  // --- General ---
  dimension: '2d',
  setDimension: (dimension) => set({ dimension }),

  // --- 2D Plane Geometry State ---
  planeScene: defaultPlaneScene,
  planeTool: 'move',
  selectedPointId2D: null,
  history2D: [],
  lessonSteps2D: [
    {
      title: 'Bắt đầu',
      body: 'Nhập đề bài hình học phẳng hoặc dùng công cụ nhanh để dựng hình.'
    }
  ],
  viewport2D: { x: 0, y: 0, width: BOARD_WIDTH, height: BOARD_HEIGHT },
  currentStep2D: -1,
  maxStep2D: -1,
  dragPointId2D: null,
  isPanning2D: false,
  panAnchor2D: null,
  analysisStatus2D: 'idle',
  analysisError2D: '',

  setPlaneScene: (scene) => set((state) => ({ planeScene: typeof scene === 'function' ? scene(state.planeScene) : scene })),
  setPlaneTool: (planeTool) => set({ planeTool }),
  setSelectedPointId2D: (selectedPointId2D) => set({ selectedPointId2D }),
  setHistory2D: (history) => set((state) => ({ history2D: typeof history === 'function' ? history(state.history2D) : history })),
  setLessonSteps2D: (steps) => set((state) => ({ lessonSteps2D: typeof steps === 'function' ? steps(state.lessonSteps2D) : steps })),
  setViewport2D: (viewport) => set((state) => ({ viewport2D: typeof viewport === 'function' ? viewport(state.viewport2D) : viewport })),
  setCurrentStep2D: (currentStep2D) => set((state) => ({ currentStep2D: typeof currentStep2D === 'function' ? currentStep2D(state.currentStep2D) : currentStep2D })),
  setMaxStep2D: (maxStep2D) => set({ maxStep2D }),
  setDragPointId2D: (dragPointId2D) => set({ dragPointId2D }),
  setIsPanning2D: (isPanning2D) => set({ isPanning2D }),
  setPanAnchor2D: (panAnchor2D) => set({ panAnchor2D }),
  setAnalysisStatus2D: (analysisStatus2D) => set({ analysisStatus2D }),
  setAnalysisError2D: (analysisError2D) => set({ analysisError2D }),

  // --- 3D Solid Geometry State ---
  manualShape3D: 'pyramid',
  autoResolve3D: true,
  yaw3D: VIEW_PRESETS.iso.yaw,
  pitch3D: VIEW_PRESETS.iso.pitch,
  roll3D: VIEW_PRESETS.iso.roll,
  zoom3D: VIEW_PRESETS.iso.zoom,
  panX3D: 0,
  panY3D: 0,
  history3D: [],
  activeStepIndex3D: 0,
  isPlaying3D: false,
  boardTool3D: 'ai',
  pickedVertex3D: null,
  pickedVertices3D: [],
  analysisStatus3D: 'idle',
  analysisError3D: '',

  setManualShape3D: (manualShape3D) => set({ manualShape3D }),
  setAutoResolve3D: (autoResolve3D) => set({ autoResolve3D }),
  setYaw3D: (yaw3D) => set({ yaw3D }),
  setPitch3D: (pitch3D) => set({ pitch3D }),
  setRoll3D: (roll3D) => set({ roll3D }),
  setZoom3D: (zoom3D) => set({ zoom3D }),
  setPanX3D: (panX3D) => set({ panX3D }),
  setPanY3D: (panY3D) => set({ panY3D }),
  setHistory3D: (history) => set((state) => ({ history3D: typeof history === 'function' ? history(state.history3D) : history })),
  setActiveStepIndex3D: (activeStepIndex3D) => set((state) => ({ activeStepIndex3D: typeof activeStepIndex3D === 'function' ? activeStepIndex3D(state.activeStepIndex3D) : activeStepIndex3D })),
  setIsPlaying3D: (isPlaying3D) => set({ isPlaying3D }),
  setBoardTool3D: (boardTool3D) => set({ boardTool3D }),
  setPickedVertex3D: (pickedVertex3D) => set({ pickedVertex3D }),
  setPickedVertices3D: (vertices) => set((state) => ({ pickedVertices3D: typeof vertices === 'function' ? vertices(state.pickedVertices3D) : vertices })),
  setAnalysisStatus3D: (analysisStatus3D) => set({ analysisStatus3D }),
  setAnalysisError3D: (analysisError3D) => set({ analysisError3D }),

  // --- Common Actions ---
  resetStore: () => set({
    // Reset 2D
    planeScene: createDefaultScene('triangle'),
    planeTool: 'move',
    selectedPointId2D: null,
    history2D: [],
    lessonSteps2D: [
      {
        title: 'Bắt đầu',
        body: 'Nhập đề bài hình học phẳng hoặc dùng công cụ nhanh để dựng hình.'
      }
    ],
    viewport2D: { x: 0, y: 0, width: BOARD_WIDTH, height: BOARD_HEIGHT },
    currentStep2D: -1,
    maxStep2D: -1,
    dragPointId2D: null,
    isPanning2D: false,
    panAnchor2D: null,
    analysisStatus2D: 'idle',
    analysisError2D: '',

    // Reset 3D
    manualShape3D: 'pyramid',
    autoResolve3D: true,
    yaw3D: VIEW_PRESETS.iso.yaw,
    pitch3D: VIEW_PRESETS.iso.pitch,
    roll3D: VIEW_PRESETS.iso.roll,
    zoom3D: VIEW_PRESETS.iso.zoom,
    panX3D: 0,
    panY3D: 0,
    history3D: [],
    activeStepIndex3D: 0,
    isPlaying3D: false,
    boardTool3D: 'ai',
    pickedVertex3D: null,
    pickedVertices3D: [],
    analysisStatus3D: 'idle',
    analysisError3D: ''
  })
}));
