class Population {
    constructor(target, maxPopulation = 100){
        this.persons = []
        this.winner = null
        this.finished = false
        this.generations = 0
        this.matePool = []
        this.target = target
        this.maxPopulation = maxPopulation
        this.newGeneratiSon = []
    }
    initPopulation(data){
        for(let i=0;i<data.length;i++){
            let pregnancies = parseInt(data[i][0])
            let glucose = parseInt(data[i][1])   
            let bloodPressure = parseInt(data[i][2])
            let skinThickness = parseInt(data[i][3])
            let insulin = parseInt(data[i][4])
            let bmi = round(parseFloat(data[i][5]))
            let diabetesPedigreeF = round(parseFloat(data[i][6]))
            let age = parseInt(data[i][7])
            let outcome = parseInt(data[i][8])
            this.persons[i] = new Person(pregnancies,glucose,bloodPressure,skinThickness,insulin,bmi,diabetesPedigreeF,age,outcome)
        }
        this.filterPersons(this.maxPopulation)
    }
    filterPersons(n){
        console.log("Poblacion inicial")
        let closest = this.persons.map((e)=>{
          e.calculateScore(this.target)  
        //   e.closeValue = abs(e.fitness - this.target.fitness)
          return e
        }) 
        closest.sort((a,b)=>a.score-b.score)
        this.persons = []
        for(let i = 0; i<n; i++){
          this.persons[i] = closest[i]
        }
        console.log(this.persons)
        //console.log(this.persons)
    }
    createMatePool(){
        console.log("Creando matePool")
        this.matePool = buildMatePool(this.persons)
        //console.log("matepool -> ",this.matePool)
    }
    crossoverPopulation(){
        this.newGeneration = []
        console.log("Crossover - Generando hijos")
        for(let i=0; i<this.matePool.length;i++){
            let posPA = this.matePool[i][0]
            let posPB = this.matePool[i][1]
            let parentA = this.persons[posPA]
            let parentB = this.persons[posPB]
            let child1 = parentA.crossover(parentB)
            let child2 = parentB.crossover(parentA)
            this.newGeneration.push(child1)
            this.newGeneration.push(child2)
        }
    }
    mutatePopulation(rate = 0.2){
        console.log("Mutate - mutacion de hijos")
        for(let i=0; i< this.newGeneration.length;i++){
            this.newGeneration[i].mutate(rate)
        }
    }
    replace(){
        for (let i = 0; i < this.newGeneration.length; i++) {
            this.newGeneration[i].calculateScore(this.target)
        }
        this.persons = this.newGeneration
        //console.log("Nueva generacion: ",this.persons)
    }
    verify(){
        for (let i = 0; i < this.persons.length; i++) {
            if (abs(this.persons[i].fitness - this.target.fitness) === 0){
                this.finished = true
                this.winner = this.persons[i]
                console.log("Winner is -> ",this.persons[i])
                return true
            } else {
                return false
            }
        }
    }
    verifyImprovement(){
        let counter = 0
        for (let i = 0; i < this.persons.length; i++) {
            if(i !== 0){
                if(this.persons[i].fitness === this.persons[i - 1].fitness){
                    counter+=1
                }
                else {
                    counter = 0
                }
            } 
        }
        // Si se repite mas de 99 veces entonces culmina el algoritmo y devuelve algun target
            if(counter >= Math.round(this.maxPopulation-1)){
            this.finished = true
            console.log("The winner is: Population number -> ",iteration)
            let percentaje = 0
            // this.persons.forEach(person=>person.dna.outcome[0] === 1 percentaje++)
            let bestpos = getBestPos(this.persons)
            this.winner = this.persons[bestpos]
            for (let i = 0; i < this.persons.length; i++) {
                // console.log(this.persons[i].dna.outcome[0])
                if(this.persons[i].dna.outcome[0] === 1 || this.persons[i].dna.outcome[0] === '1'){
                    percentaje+=1
                }
            }


            // createDiv(`Resultados 😃: ${percentaje}`)
            if(this.winner.dna.outcome[0] =='1'){
                var element = createElement("h1",`${percentaje} tienen diabetes 😟`)
                element.id('message1')
                var message1 = document.getElementById("message1");
                message1.classList.add("title");
                var element1 = createElement("h1",`Tienes diabetes 😟`)
                element1.id('message2')
                var message2 = document.getElementById("message2");
                message2.classList.add("title");
            } else {
                var element3 = createElement("h1",`${percentaje} tienen diabetes 😟`)
                element3.id('message3')
                var message3 = document.getElementById("message3");
                message3.classList.add("title");
                var element4 = createElement("h1",`No tienes diabetes 😃`)
                element4.id('message4')
                var message4 = document.getElementById("message4");
                message4.classList.add("title");
            }
            console.log(`El objetivo tiene un ${percentaje}% de probabilidades de tener la enferdad de diabetes`)
            return true
        } else {
            this.finished = false
            this.winner = null
            return false
        }
    }
    improve(){
        // add best one
        let bestPos = getBestPos(this.persons)
        // get worst one
        let worstPos = getWorstPos(this.persons)
        // replace best for worst
        this.persons[worstPos] = this.persons[bestPos]
    }
    printFitness(){
        for (let i = 0; i < this.persons.length; i++) {
            console.log(this.persons[i].fitness," ",this.target.fitness)
        }
    }
}