import create from "zustand";

export default create((set) => {
    
    
    return {
        blocksCount: 5,
        phase: 'ready',

        start: () => set({ phase: 'playing' }),
        end: () => set({ phase: 'done' }),
        restart: () => set({ phase: 'ready' }),

    }
})