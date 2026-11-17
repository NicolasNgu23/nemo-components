import { useEffect, useState, type RefObject } from 'react'

// Par défaut l'élément n'apparaît qu'une fois. Rejoué, il se cache dès qu'il quitte l'écran, pour
// réapparaître au prochain passage.
export function useInView(
  ref: RefObject<Element | null>,
  threshold = 0.2,
  isReplayed = false,
) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setIsInView(true)
          if (!isReplayed) observer.disconnect()
        } else if (isReplayed && entry.intersectionRatio === 0) {
          setIsInView(false)
        }
      },
      { threshold: [0, threshold] },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold, isReplayed])

  return isInView
}
