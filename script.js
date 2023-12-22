function Clear(){
    document.getElementById("label").style.display = "None"; 
    document.getElementById("label2").style.display = "None"; 
    document.getElementById("label3").style.display = "None"; 
    document.getElementById("label4").style.display = "None"; 
    document.getElementById("arrival").value = "";
    document.getElementById("burst").value = "";

    let parentElement = document.getElementById("append");
    let parentElement2 = document.getElementById("append2");
    let parentElement3 = document.getElementById("append3");
    let parentElement4 = document.getElementById("append4");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    while (parentElement2.firstChild) {
        parentElement2.removeChild(parentElement2.firstChild);
    }
    while (parentElement3.firstChild) {
        parentElement3.removeChild(parentElement3.firstChild);
    }
    while (parentElement4.firstChild) {
        parentElement4.removeChild(parentElement4.firstChild);
    }
}

function FCFS_Solver(){    
    document.getElementById("label").style.display = "block"; 
    document.getElementById("label2").style.display = "block"; 
    document.getElementById("label3").style.display = "block";
    document.getElementById("label4").style.display = "block";

    let output="";
    let ganttChart="";

    document.getElementById("append4").innerHTML += '<table id="Gannt"><tr id="Row1"></tr><tr id="Row2"></tr></table>';

    let arrivalTimeValue = document.getElementById('arrival').value;    
    let tempAT = arrivalTimeValue.split(' ');
    let arrivalTimeArray = JSON.parse("[" + tempAT + "]");

    let burstTime = document.getElementById('burst').value;    
    let tempBT = burstTime.split(' ');
    let burstTimeArray = JSON.parse("[" + tempBT + "]");

    let Pro=[];
    for(i=0;i<arrivalTimeArray.length;i++){
        Pro[i]='P'+(i+1);
    }

    // const arrivalTimeArray = [5, 9, 7, 8]
    // const burstTimeArray = [1, 8, 9, 4]
    // const Pro = ['P1','P2','P3','P4']
    
    document.getElementById("append").innerHTML += '<table id="Inputs"><th>JOBS</th><th>ARRIVAL TIME</th><th>BURST TIME</th></table>'; 

    for(i=0;i<arrivalTimeArray.length;i++){
        let table = document.getElementById("Inputs");
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);        
        cell1.innerHTML = Pro[i];
        cell2.innerHTML = arrivalTimeArray[i];
        cell3.innerHTML = burstTimeArray[i];
    }
    
    for (let i = 1; i < arrivalTimeArray.length; i++) {
        let key = arrivalTimeArray[i];
        let key2 =burstTimeArray[i]
        let key3 =Pro[i]
        let j = i - 1;
        while (j >= 0 && key < arrivalTimeArray[j]) {
            arrivalTimeArray[j + 1] = arrivalTimeArray[j];
            burstTimeArray[j + 1] = burstTimeArray[j];
            Pro[j + 1] = Pro[j];
            j--;
        }
        arrivalTimeArray[j + 1] = key;
        burstTimeArray[j + 1] = key2;
        Pro[j + 1] = key3;
    }
    
    class Process{
        constructor(name, arrivalTime, burstTime){
          this.name = name;
          this.arrivalTime = arrivalTime;
          this.burstTime = burstTime;
          this.completionTime = 0;
          this.turnaroundTime = 0;
          this.waitingTime = 0;
          this.responseTime = 0;
        }
    }
      
        function runFCFS(processes){
                let currentTime = 0;
                let totalWaitingTime = 0;
                let totalTurnaroundTime = 0;
                let totalResponseTime = 0;
        
            for (let i = 0; i < processes.length; i++){
                let table = document.getElementById("Outputs");
                let row = table.insertRow(i+1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2); 
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);               
                let process = processes[i];

                

                if (process.arrivalTime > currentTime){
                    ganttChart+=`Idle ${currentTime}-${process.arrivalTime} `;
                    currentTime = process.arrivalTime;
                }
            
                ganttChart+=`${process.name} ${currentTime}`;

                process.responseTime = currentTime - process.arrivalTime;
                totalWaitingTime += currentTime - process.arrivalTime;
                currentTime += process.burstTime;
                process.completionTime = currentTime;
                process.turnaroundTime = process.completionTime - process.arrivalTime;
                totalTurnaroundTime += process.turnaroundTime;
                totalResponseTime += process.responseTime;       
                
                ganttChart +=`-${currentTime} `;

                
                
                cell1.innerHTML = `${process.name}`;
                cell2.innerHTML = `${process.arrivalTime}`;
                cell3.innerHTML = `${process.burstTime}`;
                cell4.innerHTML = `${process.completionTime}`;
                cell5.innerHTML = `${process.turnaroundTime}`;
                cell6.innerHTML = `${process.turnaroundTime - process.burstTime}`;
                cell7.innerHTML = `${process.responseTime}`;
            }

            
            let averageWaitingTime = totalWaitingTime / processes.length;
            let averageTurnaroundTime = totalTurnaroundTime / processes.length;
            let averageResponseTime = totalResponseTime / processes.length;            
            
            let table = document.getElementById("Average");
            let row = table.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);  
            cell1.innerHTML = averageWaitingTime;
            cell2.innerHTML = `${averageTurnaroundTime}`;
            cell3.innerHTML = `${averageResponseTime}`;

            let row1= document.getElementById("Row1");    
            let row2 = document.getElementById("Row2");
            

            let ganntArr = ganttChart.split(' ');
            console.log(ganntArr);           
            let l = 0;
            
            let table2 = document.getElementById("Gannt");
            let Tb2row = table2.insertRow(0);
            let Tb2row2 = table2.insertRow(1);           

            let count = 0
            let count2 = 0
            while (l < (ganntArr.length)) {
                    if(l%2 == 0)
                    {
                        let Tb2cell = Tb2row.insertCell(count); 
                        Tb2cell.innerHTML = ganntArr[l];
                        count++;  
                    }
                    else
                    {
                        let Tb2cell = Tb2row2.insertCell(count2); 
                        Tb2cell.innerHTML = ganntArr[l]; 
                        count2++;
                    }
                l++
                if(ganntArr[l] == "") break;
            }
        }      

    let customProcesses = [];    
    for (let i = 1; i<=arrivalTimeArray.length; i++) {
    let process = new Process(Pro[i-1], arrivalTimeArray[i-1], burstTimeArray[i-1]); 
    customProcesses.push(process);
    }      
    
    document.getElementById("append2").innerHTML += '<table id="Outputs"><th>JOBS</th><th>ARRIVAL TIME</th><th>BURST TIME</th><th>COMPLETION TIME</th><th>TURN AROUND TIME</th><th>WAITING TIME</th><th>RESPONSE TIME</th></table>';
    document.getElementById("append3").innerHTML += '<table id="Average"><th>AVERAGE WAITING TIME</th><th>AVERAGE TURN AROUND TIME</th><th>AVERAGE RESPONSE TIME</th></table>';    
    
    runFCFS(customProcesses);    
}