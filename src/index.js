import fetch from 'node-fetch'


export let top = (limit) => { 
    let x =  fetch('http://hypem.com/playlist/popular/3day/json/1/data.js')
    .then( res => ( res.json() ) )
    .then( ( json ) => {
        if (limit && limit < 20){ 
            let res = {}
            for(var i = 0; i <= (limit-1); i+=1 ){
                res[`${ i }`] = json[`${ i }`]
            }
            return res
        }
        return json
    })
    .catch( error => console.log(error) )

    return x
} 


export let latest = (limit) => { 
    let x =  fetch('http://hypem.com/playlist/latest/all/json/1/data.json')
    .then( res => ( res.json() ) )
    .then( ( json ) => {
        if (limit && limit < 20){ 
            let res = {}
            for(var i = 0; i <= (limit-1); i+=1 ){
                res[`${ i }`] = json[`${ i }`]
            }
            return res
        }
        return json
    })
    .catch( error => console.log(error) )

    return x
} 

export let remixes = (limit) => { 
    let x =  fetch('http://hypem.com/playlist/popular/remix/json/1/data.json')
    .then( res => ( res.json() ) )
    .then( ( json ) => {
        if (limit && limit < 20){ 
            let res = {}
            for(var i = 0; i <= (limit-1); i+=1 ){
                res[`${ i }`] = json[`${ i }`]
            }
            return res
        }
        return json
    })
    .catch( error => console.log(error) )

    return x
} 







