class UniversalArray{
	#array
	#nElements
	constructor(maxSize) {
		this.#array = new Array(maxSize)
		this.#nElements = 0
	}
	getSize() { // Длинна
		return this.#nElements
	}
	getMedian() { // Метод возвращающий медиану
		if (this.#nElements === 0) {
			console.log("the array contains no elements, is empty")
			return
		}
		if (this.#nElements === 1) {
			console.log("the array contains 1 number")
			return
		}
		this.insertSort()
		const middle = Math.floor((0 + this.#nElements - 1) / 2)
		if (this.#nElements % 2 !== 0) return this.#array[middle]
		return ((this.#array[middle] + this.#array[middle + 1]) / 2)
	}
	noDups() { // метод удаляющий все дубликаты за O(N)
		if (this.#nElements <= 1) return
		this.insertSort()
		let numberDeleted = 0
		let correctIndex = 1
		let target = this.#array[0]
		for (let m = 1; m < this.#nElements; m++) {
			if (target !== this.#array[m]) {
				target = this.#array[m]
				this.#array[correctIndex] = target
				++correctIndex
			} else {
				numberDeleted++
			}
		}
		this.#nElements -= numberDeleted
	}
	findDefault(searchElement) { // Поиск
		let j
		for (j = 0; j < this.#nElements; j++) {
			if (this.#array[j] === searchElement) break
		}
		if (j === this.#nElements) {
			console.log(`element ${searchElement} is not found in array`)
			return this.#nElements
		}
		console.log(`element ${searchElement} found in array, his index ${j}`)
		return j
	}
	findBinary(searchElement) {
		let startIndex = 0
		let endIndex = this.#nElements - 1

		while(startIndex <= endIndex) {
			const middleIndex = Math.floor((startIndex + endIndex) / 2)

			if (this.#array[startIndex] === searchElement) return startIndex
			if (this.#array[middleIndex] === searchElement) return middleIndex
			if (this.#array[endIndex] === searchElement) return endIndex
			if (endIndex - startIndex <= 2) return this.#nElements // если элемент не найден возвращаем просто длинну

			if (this.#array[middleIndex] < searchElement) {
				startIndex = middleIndex + 1
			} else if (this.#array[middleIndex] > searchElement) {
				endIndex = middleIndex - 1
			}
		}
	}
	insertDefault(newElement) { // Вставка
		this.#array[this.#nElements] = newElement
		this.#nElements++
	}
	insertBinary(newElement) {
		if (this.#nElements === 0) {
			this.#array[this.#nElements] = newElement
			this.#nElements++
			return
		}
		let startIndex = 0
		let endIndex = this.#nElements - 1
		let flag = true
		let j
		if (newElement > this.#array[endIndex]) {
			j = this.#nElements
			flag = false
		}
		if (newElement < this.#array[startIndex]) {
			j = startIndex
			flag = false
		}
		while(flag) {
			const middleIndex = Math.floor((startIndex + endIndex) / 2)
			if (this.#array[endIndex] > newElement) j = endIndex
			if (this.#array[middleIndex] > newElement) {
				j = middleIndex
				endIndex = middleIndex - 1
			} else if (this.#array[middleIndex] < newElement) {
				startIndex = middleIndex + 1
			}
			if (this.#array[startIndex] > newElement) j = startIndex

			if (startIndex === endIndex || startIndex > endIndex) flag = false
		}
		// цикл сдвигающий элементы
		for (let k = this.#nElements; k > j; k--) {
			this.#array[k] = this.#array[k - 1]
		}
		this.#array[j] = newElement
		this.#nElements++
	}
	deleteDefault(deletedElement) { // Удаление
		let j
		for (j = 0; j < this.#nElements; j++) {
			if (this.#array[j] === deletedElement) break
		}
		if (j === this.#nElements) {
			console.log(`element ${deletedElement} was not deleted`)
			return false
		}
		for (let m = j; m < this.#nElements - 1; m++) {
			this.#array[m] = this.#array[m + 1]
		}
		this.#nElements--
		return true
	}
	deleteBinary(deletedElement) {
		const indexDeleted = this.findBinary(deletedElement)
		if (indexDeleted === this.#nElements) {
			console.log(`the element was not found in the array to delete it`)
			return false
		}
		for (let x = indexDeleted; x < this.#nElements - 1; x++) {
			this.#array[x] = this.#array[x + 1]
		}
		this.#nElements--
		return true
	}
	display() { // Вывод в консоль
		for (let m = 0; m < this.#nElements; m++) {
			console.log(`Element: ${this.#array[m]}; Index: ${m};`)
		}
	}
	// СОРТИРОВКИ
	bubblesSort() { // <--- пузырьком
		if (this.#nElements <= 1) return
		for (let reverse = this.#nElements - 1; reverse >= 1; reverse--) {
			for (let straight = 0; straight < reverse; straight++) {
				if (this.#array[straight] > this.#array[straight + 1]) {
					const save = this.#array[straight]
					this.#array[straight] = this.#array[straight + 1]
					this.#array[straight + 1] = save
				}
			}
		}
	}
	selectSort() { // <--- сортировка методом выбора
		if (this.#nElements <= 1) return
		for (let out = 0; out < this.#nElements - 1; out++) {
			let min = out
			for (let inner = out + 1; inner < this.#nElements; inner++) {
				if (this.#array[inner] < this.#array[min]) min = inner

				if (inner === this.#nElements - 1) {
					const save = this.#array[out]
					this.#array[out] = this.#array[min]
					this.#array[min] = save
				}
			}
		}
	}
	insertSort() { // <--- сортировка методом вставки
		if (this.#nElements <= 1) return
		for (let out = 1; out < this.#nElements; out++) {
			let save = this.#array[out]
			let inner = out
			while(inner > 0 && this.#array[inner - 1] >= save) {
				this.#array[inner] = this.#array[inner - 1]
				--inner
			}
			this.#array[inner] = save
		}
	}
	swapFoDoubleSidedBubble(index1, index2) { // вспомогательный метод для двустороннего пузырька
		const save = this.#array[index1]
		this.#array[index1] = this.#array[index2]
		this.#array[index2] = save
	}
	doubleSidedBubble() { // <--- улучшенный (двусторонний пузырек)
		if (this.#nElements <= 1) return
		let leftToRight = 0
		let rightToLeft = this.#nElements - 1
		let inner
		for (; rightToLeft > leftToRight; rightToLeft--) {
			for (inner = 0; inner < rightToLeft; inner++) {
				if (this.#array[inner] > this.#array[inner + 1]) this.swapFoDoubleSidedBubble(inner, inner + 1)
			}
			for (inner = rightToLeft - 1; inner > leftToRight; inner--) {
				if (this.#array[inner - 1] > this.#array[inner]) this.swapFoDoubleSidedBubble(inner, inner - 1)
			}
			++leftToRight
		}
	}
	oddEvenSort() { // <--- сортировка методом четных - нечетных перестановок
		if (this.#nElements <= 1) return
		for (let out = 0; out < this.#nElements; out++) {
			for (let inner = (out % 2 === 0 ? 0 : 1); inner < this.#nElements - 1; inner += 2) {
				if (this.#array[inner] > this.#array[inner + 1]) {
					const save = this.#array[inner]
					this.#array[inner] = this.#array[inner + 1]
					this.#array[inner + 1] = save
				}
			}
		}
	}
	insertSortAndNoDups() { // <--- сортировка методом вставки и удаление дубликатов
		if (this.#nElements <= 1) return
		let scoreDelete = 0
		for (let out = 1; out < this.#nElements; out++) {
			let save = this.#array[out] // пограничник
			let inner = out
			while(inner > 0 && this.#array[inner - 1] >= save) {
				if (this.#array[inner - 1] === save) save = -1
				this.#array[inner] = this.#array[inner - 1]
				--inner
			}
			if (save === -1) scoreDelete++
			this.#array[inner] = save
		}
		let correctIndex = 0
		for (let m = scoreDelete; m < this.#nElements; m++) {
			this.#array[correctIndex] = this.#array[m]
			++correctIndex
		}
		this.#nElements -= scoreDelete
	}
}

class UniversalArrayApp{
	static main() {
		const MAX_SIZE = 100
		const arrayInstance = new UniversalArray(MAX_SIZE)
		const arrayElements = [100, 22, 66, 77, 33]
		for (let m = 0; m < arrayElements.length; m++) {
			arrayInstance.insertDefault(arrayElements[m])
		}
		arrayInstance.display()
		console.log("before sort method")
		arrayInstance.insertSortAndNoDups()
		arrayInstance.display()
		console.log(arrayInstance.getSize())
	}
}

UniversalArrayApp.main()



