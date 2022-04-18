import { IqueryInfo } from '@/store/main/system/systemType'
import hyRequest from '../../index'
interface IResultData {
  code: string
  data: {
    list: any[]
    totalCount: number
  }
}
export function getPageListData(url: string, queryInfo: IqueryInfo) {
  return hyRequest.post<IResultData>({
    url: url,
    data: queryInfo
  })
}
