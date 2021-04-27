import {getNewHouse} from '../src/server/utils/housespider'

getNewHouse().then(rs=>{
  console.log(rs)
}).catch(e=>{
  console.log(e)
})