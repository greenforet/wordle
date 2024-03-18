
let attempts = 0;
let index = 0;
let timer




function appStart(){
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료됐습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color:white; width:200px; height:100px;";
        document.body.appendChild(div);
    }
   
    const gameover = () => {
        window.removeEventListener("keydown",handleKeydown);
        displayGameover();
        clearInterval(timer);
        };
    const nextLine = () => {
        if (attempts === 6) return gameover();
        attempts += 1;
        index = 0;
    };
    const handleEnterKey = async() => {
        let 맞은_갯수 = 0;
        
        //서버에서 정답을 받아오는 코드
        const 응답 = await fetch('/answer');
        const 정답 = await 응답.json();
    
    

        for(let i=0; i<5; i++){
            const block = document.querySelector(
                `.board-block[data-index='${attempts}${i}']`
            );
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if (입력한_글자 === 정답_글자){
                맞은_갯수 += 1;
                block.style.background = "#6AAA64";
            } 
            else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
            else block.style.background = "#787C7E";

            block.style.color = "white";
        }
        if (맞은_갯수 === 5) gameover();
        else nextLine();
    };
    const handleBackspace = () => {
        if (index > 0 ){
        const preBlock = document.querySelector(
            `.board-block[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = "";
        }
        if (index !== 0) index -= 1;
    };
    const handleKeydown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
            `.board-block[data-index='${attempts}${index}']`
        );
        
        if (event.key === "Backspace") handleBackspace();
        else if (index === 5){
         if (event.key === "Enter") handleEnterKey();
         else return;
        }else if (65 <= keyCode && keyCode <= 90){
            thisBlock.innerText = key;
            index += 1;
        }
    };

    const startTimer = () => {
        const startTime = new Date();

        function setTime(){
        const nowTime = new Date();
        const flowTime = new Date(nowTime - startTime);
        const minute = flowTime.getMinutes().toString();
        const second = flowTime.getSeconds().toString();
        const timeDiv = document.querySelector("#timer");
        timeDiv.innerText = `${minute.padStart(2,'0')}: ${second.padStart(2,'0')}`;
        }

        timer = setInterval(setTime, 1000);
        console.log(timer);
    };

    startTimer();
    window.addEventListener("keydown", handleKeydown);


}

appStart();

