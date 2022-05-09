import { coordinateData } from './coordinate-data'

// 拿到了后台返回的数据 address count
// 将其转化为name value的格式
// 然后再这里调用 coordinateData先拿到address（name） 对应的坐标
// 然后如果坐标存在的情况下 将格式打包为
// [{name:上海,value:[123,24,555]},{....},{....}]的格式 用来让地图读取对应的数据
// 地图要渲染点就需要知道 name以及对应的value 而value的格式 就是坐标加上点的值
export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  console.log(res)
  return res
}
