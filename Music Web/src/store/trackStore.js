import { create } from "zustand";

export const useTrackStore = create((set) => ({
  isPlaying: false,
  currentTrack: { trackName: null, artists: null, previewUrl: null, id: null },
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
}));
