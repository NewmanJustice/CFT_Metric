export type SpaceMetric = {
  id: number
  teamName: string
  satisfaction: {
    teamSatisfaction: string
    /** Number of developers with a defined learning pathway. */
    numberOfTShaped: number
  }
  performance: number
  activity: number
  communication: number
  efficiency: number
  month: Date
}
