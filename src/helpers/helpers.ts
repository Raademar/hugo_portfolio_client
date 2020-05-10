import { useEffect, useState } from 'react'

export function move(array: any[], from: number, to: number) {
  if (to === from) return array

  var target = array[from]
  var increment = to < from ? -1 : 1

  for (var k = from; k != to; k += increment) {
    array[k] = array[k + increment]
  }
  array[to] = target
  return array
}

export const sortImageGrid = (arr: any[]): any[] => {
  const sortedArr: any[] = []
  arr.map((item, index) => {
    if (item === undefined) {
      return
    }
    if (index === 0) {
      sortedArr.push(item)
    } else if (index === 1 && item.featuredProject) {
      move(arr, index, index + 1)
    } else if (index === 1 && !item.featuredProject) {
      sortedArr.push(item)
    } else if (
      item.featuredProject &&
      !arr[index - 1].featuredProject &&
      !arr[index - 2].featuredProject
    ) {
      sortedArr.push(item)
    } else if (
      (item.featuredProject && arr[index - 1].featuredProject === true) ||
      (item.featuredProject && arr[index - 2].featuredProject === true)
    ) {
      move(arr, index, index + 1)
    } else {
      sortedArr.push(item)
    }
  })
  if (sortedArr.length === arr.length) {
    return sortedArr
  } else {
    return []
  }
}

export function zip(falsyArr: any[], truthyArr: any[]) {
  let zippedValues = []
  for (let i = 0, n = 0; i < falsyArr.length; i++, n += 2) {
    if (
      (falsyArr.length % 2 !== 0 && falsyArr[n - 1] && !falsyArr[n]) ||
      !falsyArr[n + 1]
    ) {
      zippedValues.push(falsyArr[n])
    }
    if (!falsyArr[n] || !falsyArr[n + 1]) {
      return zippedValues
    } else {
      zippedValues.push(falsyArr[n], falsyArr[n + 1], truthyArr[i])
    }
  }
  return zippedValues
}

export function useWindowSize() {
  const isClient = typeof window === 'object'
  function getSize() {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    }
  }
  const [windowSize, setWindowSize] = useState(getSize)
  useEffect((): any => {
    if (!isClient) {
      return false
    }
    function handleResize() {
      setWindowSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return windowSize
}

export const useOutsideClick = (ref: any[], callback: any) => {
  const handleClick = (e: any) => {
    for (let i = 0; i < ref.length; i++) {
      if (ref[i].current.contains(e.target)) {
        break
      } else if (i === ref.length - 1) {
        callback()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
