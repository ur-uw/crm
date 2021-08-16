import { ComputedRef } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
type out = {
  width: ComputedRef<number>
  type: ComputedRef<'xs' | 'md' | 'lg' | unknown>
}
export const useBreakPoints = (): out => {
  const windowWidth = ref(window.innerWidth)

  const onWidthChange = () => (windowWidth.value = window.innerWidth)
  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const width = computed(() => windowWidth.value)

  const getScreenType = (): 'xs' | 'md' | 'lg' | unknown => {
    if (windowWidth.value < 550) return 'xs'
    if (windowWidth.value > 549 && windowWidth.value < 1200) return 'md'
    if (windowWidth.value > 1199) return 'lg'
  }
  const type = computed(() => getScreenType())

  return { width, type }
}
