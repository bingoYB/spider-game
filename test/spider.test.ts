import {getNewHouse} from '../src/server/utils/spider'

getNewHouse().then(rs=>{
  console.log(rs)
}).catch(e=>{
  console.log(e)
})