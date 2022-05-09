import { IqueryInfo } from '@/store/main/system/systemType'
import hyRequest from '../../index'
interface IResultData {
  code: string
  data: {
    list: any[]
    totalCount: number
  }
}
interface deleteResult {
  code: string
}

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IResultData>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return hyRequest.delete<deleteResult>({
    url: url
  })
}
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IResultData>({
    url: url,
    data: newData
  })
}
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IResultData>({
    url: url,
    data: editData
  })
}
