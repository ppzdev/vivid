import { onMounted, onUnmounted, type Ref } from 'vue'

export function useClickOutside(
    targetRef: Ref<HTMLElement | null>,
    excludeRef: Ref<HTMLElement | null>,
    callback: (event: MouseEvent) => void
) {
    const handleClickOutside = (event: MouseEvent) => {
        const isTarget = targetRef.value && targetRef.value.contains(event.target as Node)
        const isExclude = excludeRef.value && excludeRef.value.contains(event.target as Node)

        if (!isTarget && !isExclude) {
            callback(event)
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
}