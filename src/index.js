import fetch from 'node-fetch'


export let top = () => { 
    let x =  fetch('http://hypem.com/playlist/popular/3day/json/1/data.js')
    .then( res => ( res.json() ) )
    .then( ( json ) => {
        return json
    })

    return x
} 


export let latest = () => { 
    let x =  fetch('http://hypem.com/playlist/latest/all/json/1/data.json')
    .then( res => ( res.json() ) )
    .then( ( json ) => {
        return json
    })
    .catch( error => console.log(error) )

    return x
} 

export let remixes = () => { 
    let x =  fetch('http://hypem.com/playlist/popular/remix/json/1/data.json')
    .then( res => ( res.json() ) )
    .then( json => {
        return json
    })
    .catch( error => console.log(error) )
    
    return x
} 







