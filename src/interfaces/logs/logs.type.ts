export type ILogs = {
  userId: number
  teamId: number
  accountId?: number
  status: ILogsStatus
}

export enum ILogsStatus {
  added = 'added',
  deleted = 'deleted',
}
