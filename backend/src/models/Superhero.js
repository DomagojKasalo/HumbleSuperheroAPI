class Superhero {
    constructor(name, superpower, humilityScore) {
        this.id = Date.now(); 
        this.name = name;
        this.superpower = superpower;
        this.humilityScore = humilityScore;
    }
}

module.exports = Superhero;
