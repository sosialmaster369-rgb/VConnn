import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useVideoStore = create((set, get) => ({
  // Video properties
  videos: [],
  currentVideo: null,
  
  // Editor properties
  brightness: 1,
  contrast: 1,
  saturation: 1,
  speed: 1,
  trimStart: 0,
  trimEnd: 60,
  textOverlays: [],
  
  // UI State
  isLoading: false,
  
  // Video Actions
  setCurrentVideo: (video) => set({ currentVideo: video }),
  
  addVideo: (video) => set((state) => ({
    videos: [video, ...state.videos],
  })),
  
  updateVideo: (videoId, updates) => set((state) => ({
    videos: state.videos.map((v) => 
      v.id === videoId ? { ...v, ...updates } : v
    ),
  })),
  
  deleteVideo: (videoId) => set((state) => ({
    videos: state.videos.filter((v) => v.id !== videoId),
  })),
  
  // Editor Actions
  setBrightness: (value) => set({ brightness: value }),
  setContrast: (value) => set({ contrast: value }),
  setSaturation: (value) => set({ saturation: value }),
  setSpeed: (value) => set({ speed: value }),
  
  setTrimStart: (value) => set({ trimStart: value }),
  setTrimEnd: (value) => set({ trimEnd: value }),
  
  addTextOverlay: (text) => set((state) => ({
    textOverlays: [...state.textOverlays, text],
  })),
  
  updateTextOverlay: (index, updates) => set((state) => ({
    textOverlays: state.textOverlays.map((t, i) => 
      i === index ? { ...t, ...updates } : t
    ),
  })),
  
  removeTextOverlay: (index) => set((state) => ({
    textOverlays: state.textOverlays.filter((_, i) => i !== index),
  })),
  
  resetEdits: () => set({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    speed: 1,
    trimStart: 0,
    trimEnd: 60,
    textOverlays: [],
  }),
  
  // Persist store
  saveState: async () => {
    try {
      const state = get();
      const persistState = {
        videos: state.videos,
        brightness: state.brightness,
        contrast: state.contrast,
        saturation: state.saturation,
        speed: state.speed,
        trimStart: state.trimStart,
        trimEnd: state.trimEnd,
      };
      await AsyncStorage.setItem('@vconnn_store', JSON.stringify(persistState));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  },
  
  loadState: async () => {
    try {
      const state = await AsyncStorage.getItem('@vconnn_store');
      if (state) {
        const parsedState = JSON.parse(state);
        set(parsedState);
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
  },
}));
