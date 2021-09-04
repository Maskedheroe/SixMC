import { computed, nextTick, ref, watch } from 'vue'
export default function useFixed(props) {
  const TITLE_HEIGHT = 30
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0, ${diff}px, 0)`
    }
  })

  watch(() => props.data, async () => {
    await nextTick()
    calculate()
  })

  watch(scrollY, newY => {
    const listHeightsVal = listHeights.value
    for (let index = 0; index < listHeightsVal.length; index++) {
      const heightTop = listHeightsVal[index]
      const heightBottom = listHeightsVal[index + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = index
        distance.value = heightBottom - newY
      }
    }
  })

  function calculate() {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0
    listHeightsVal.length = 0
    listHeightsVal.push(height)
    for (const key in list) {
      height += list[key].clientHeight
      listHeightsVal.push(height)
    }
  }
  function onScroll(pos) {
    scrollY.value = -pos.y
  }
  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex
  }
}
