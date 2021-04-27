import http from '../utils/request'

// glitch构建的一个计数器应用
export function getCounter(): Promise<number> {
  return http.get('https://counter-bingo.glitch.me/counter?user=spidergame')
}