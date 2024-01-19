

export interface LiftExerciseDataChunk {
  date: string
  volume: number
  repetitions: number
  max: number
  seriesData: SeriesData[]
}

export interface SeriesData {
  series: number
  volume: number
  repetitions: number
  mass: number
}
