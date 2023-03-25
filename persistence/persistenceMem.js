class PersistenceMem {
    constructor(){
        this.array = []
    }
    async init() {
        console.log('products dao en mem -> listo!')
    }
	
	async disconnect() {
        console.log('products dao en mem -> cerrado!')
    }
}

export default new PersistenceMem()

