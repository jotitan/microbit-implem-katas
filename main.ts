let counter = 0;

input.onLogoEvent(TouchButtonEvent.Released, ()=>{
    counter = (counter + 1)%10;
})

input.onButtonPressed(Button.A, ()=>{
    //basic.showNumber(counter);
    showResultTest();
})

input.onButtonPressed(Button.B, () => {
    //basic.showString(`Test ${counter}`);
    executeTest();
})

function getTest(){
    switch(counter){
        case 0 : return new Test1();
        case 1 : return new Test2();
        case 2 : return new Test3();
    }
    return null;
}

function showResultTest(){
    testOrShowTest((_,results)=>show(results))
}

function executeTest(){
    testOrShowTest((test, results) => checkTest(test, results))
}

function testOrShowTest(fct:(test :Test<any>,data: any)=>void) {
    const test = getTest()
    const solver = getExoSolver()
    if (test == null || solver == null) {
        return;
    }
    fct(test, solver(test.getInput()));
}

function show(results:any){
    if (Array.isArray(results)){
        const r = results as number[][];
        for (let i = 0 ; i < r.length ; i++){
            for (let j = 0; j < r[i].length; j++) {
                if(r[i][j]=== 0){
                    led.unplot(i,j)
                }else{
                    led.plot(i,j)
                }
            }  
        }
    }
    if(typeof results === "number"){
        basic.showNumber(results)
    }
}

function getExoSolver(){
    switch(counter){
        case 0 : return doExo1;
        case 1 : return doExo2;
    }
    return null;
}

function doExo1(input: int16[][]):number[][]{
    let output:number[][] = [];
    for (let i = 0 ; i < input.length ; i++){
        let line:number[] = [];
        for (let j = input[i].length -1 ; j >=0 ; j--){
            line.push(input[i][j])
        }
        output.push(line);
    }
    return output;
}

function doExo2(input: int16[][]) {
    let sum = 0;
    for(let i = 0 ; i < input.length ; i++){
        sum+=input[i].reduce((a,b)=>a+b, 0)
    }
    return sum;
}