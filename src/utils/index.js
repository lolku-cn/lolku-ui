export default class Lolku {
    constructor () {
        
    }
    back(thatVue){
        thatVue.$router.go(-1)
    }
}