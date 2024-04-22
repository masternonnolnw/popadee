import { create } from 'zustand'

interface IStatStore {
  currentScore: number
  setCurrentScore: (score: number) => void
}

const statStore = create<IStatStore>((set) => ({
  currentScore: 0,
  setCurrentScore: (score) => set({ currentScore: score }),
}))

export default statStore
