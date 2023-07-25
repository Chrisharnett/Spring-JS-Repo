class Die {
    constructor(
        sides
    ) {
        this.sides = parseInt(sides)
        this.value = 0
    }
    roll() {
        return (Math.floor(Math.random() * this.sides)+1)
    }
    getValue() {
        return this.value
    }
}