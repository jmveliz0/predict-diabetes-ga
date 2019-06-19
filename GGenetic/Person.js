class Person {
    constructor (pregnancies,glucose,bloodPressure,skinThickness,insulin,bmi,diabetesPedigreeF,age,outcome = 0) {
        this.dna = null
        this.fitness = 0
        this.score = 0
        this.calculateFitness(pregnancies,glucose,bloodPressure,skinThickness,insulin,bmi,diabetesPedigreeF,age)
        this.initBinary(pregnancies,glucose,bloodPressure,skinThickness,insulin,bmi,diabetesPedigreeF,age,outcome)
    }

    initBinary(pregnancies,glucose,bloodPressure,skinThickness,insulin,bmi,diabetesPedigreeF,age,outcome){
        pregnancies = dec2bin(pregnancies)
        glucose = dec2bin(glucose)
        bloodPressure = dec2bin(bloodPressure)
        skinThickness = dec2bin(skinThickness)
        insulin = dec2bin(insulin)
        bmi = dec2bin(bmi)
        diabetesPedigreeF = dec2bin(diabetesPedigreeF)
        age = dec2bin(age)
        outcome = dec2bin(outcome)
        this.dna = {
            pregnancies,
            glucose,
            bloodPressure,
            skinThickness,
            insulin,
            bmi,
            diabetesPedigreeF,
            age,
            outcome
        }
    }

    calculateFitness(pregnancies,glucose,bloodPressure,skinThickness,insulin,bmi,diabetesPedigreeF,age){
        this.fitness = calculateHeuristic(pregnancies,glucose,bloodPressure,skinThickness,insulin,bmi,diabetesPedigreeF,age)
    }

    calculateScore(target){
        this.score = abs(target.fitness - this.fitness)
    }

    crossover(otherPerson){
        let newDna = {}
        let att = ["pregnancies","glucose","bloodPressure","skinThickness","insulin","bmi","diabetesPedigreeF","age","outcome"]
        for(let i = 0; i<att.length; i++){
            newDna[att[i]] = this.dna[att[i]]
            let randomPoint = floor(random(0,newDna[att[i]].length))
            let election = random()>=0.5 ? "first" : "last"
            replaceElements(newDna[att[i]],otherPerson.dna[att[i]],randomPoint,election) 
        }
        newDna.outcome = this.dna.outcome
        for(let i = 0; i < att.length; i++) {
            newDna[att[i]] = bin2dec(newDna[att[i]])
        }
        let person = new Person(newDna.pregnancies,newDna.glucose,newDna.bloodPressure,
            newDna.skinThickness,newDna.insulin,newDna.bmi,newDna.diabetesPedigreeF,
            newDna.age,newDna.outcome)
        return person
    }

    mutate(mutationRate = 0.2){
        let att = ["pregnancies","glucose","bloodPressure","skinThickness","insulin","bmi","diabetesPedigreeF","age","outcome"]
        for(let i = 0; i<att.length; i++){
            let randomPoint = floor(random(floor(this.dna[att[i]].length/2),this.dna[att[i]].length))
            if(mutationRate>=random()){
                this.dna[att[i]][randomPoint] === 0 ? (this.dna[att[i]][randomPoint]=1) : (this.dna[att[i]][randomPoint]=0)
            }
        }
    }
    
}