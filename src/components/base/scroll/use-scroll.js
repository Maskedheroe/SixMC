import BScroll from '@better-scroll/core'
import { ref, onUnmounted, onMounted } from 'vue'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true
    })
    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
  return {
    scroll
  }
}
