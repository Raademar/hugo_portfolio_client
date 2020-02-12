// export function array_move(arr: any[], old_index: number, new_index: number) {
// 	while (old_index < 0) {
// 		old_index += arr.length
// 	}
// 	while (new_index < 0) {
// 		new_index += arr.length
// 	}
// 	if (new_index >= arr.length) {
// 		var k = new_index - arr.length + 1
// 		while (k--) {
// 			arr.push(undefined)
// 		}
// 	}
// 	arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
// 	return arr // for testing purposes
// }

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
	// console.log(arr)

	const sortedArr: any[] = []
	arr.map((item, index) => {
		if (item === undefined) {
			return
		}
		// console.log(item)
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
		console.log(sortedArr)
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
			zippedValues.push(falsyArr[n - 1])
		}
		if (!falsyArr[n] || !falsyArr[n + 1]) {
			return zippedValues
		} else {
			zippedValues.push(falsyArr[n], falsyArr[n + 1], truthyArr[i])
		}
	}
	return zippedValues
}
