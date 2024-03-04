import {create} from 'zustand';

// Define el tipo de estado
interface HorariosState {
  selectedDays: string[];
  selectedStartTime: string;
  selectedEndTime: string;
  setSelectedDays: (days: string[]) => void;
  setSelectedStartTime: (time: string) => void;
  setSelectedEndTime: (time: string) => void;
}

// Define el store
const useHorariosStore = create<HorariosState>((set) => ({
  selectedDays: [],
  selectedStartTime: '',
  selectedEndTime: '',
  setSelectedDays: (days) => set({ selectedDays: days }),
  setSelectedStartTime: (time) => set({ selectedStartTime: time }),
  setSelectedEndTime: (time) => set({ selectedEndTime: time }),
}));

export default useHorariosStore;
