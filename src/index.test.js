var expect = require('chai').expect;
var hype5 = require('../src/index.js');


describe("hype5", ()=>{
    describe(" 'top' method ", ()=>{
        it("'top' method should return promise",()=>{

            function isAPromise(res){
                return res instanceof Promise
            };

            expect(hype5.top()).to.satisfy(isAPromise)
        });

        it(" Promise should contain object", ()=>{
            let array;

            hype5.top().then((data)=> {
                expect(data).to.be.an('object')
            })
            .catch(err => console.log(err))
        });

        it(" Promise data should contain certain properties",()=>{
            hype5.top().then(data=>{
                expect(data["0"]).to.contain.all.keys(["artist","title", "posturl", "thumb_url"])
            })
            .catch(err => console.log(err))
        })
    })
})
