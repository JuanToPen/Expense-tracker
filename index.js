const button = document.getElementById("button")
const table = document.getElementById("tracker")
const regex = /^[0-9]+$/
const number = document.getElementById("number")
const totalTable = document.getElementById("totalTable")
const eliminateButtons = document.getElementsByClassName("eliminate")
const sumText = document.getElementById("sumText")
const preview = document.getElementById("preview")
let arr = []

button.addEventListener("click",()=>{
    const newRow = document.createElement("tr")
    const name = document.createElement("td")
    const date = document.createElement("td")
    const amount = document.createElement("td")
    const eliminateContainer = document.createElement("td")
    const eliminate = document.createElement("button")
    eliminate.innerText = "X"
    eliminateContainer.style.textAlign = "center"
    eliminate.setAttribute("class","eliminate")
    totalTable.style.display = "flex"
    if (document.getElementById("preview") !== null){
        document.getElementById("preview").remove()
    }
        name.innerText = document.getElementById("name").value
        date.innerText = document.getElementById("date").value
        if (regex.test(document.getElementById("amount").value) === false){ 
            document.getElementById("amount").style.borderColor = "red"
            totalTable.style.display = "none"
            let previewContainer = document.createElement("tr")
            let td1 = document.createElement("td")
            let td2 = document.createElement("td")
            let td3 = document.createElement("td")
            let td4 = document.createElement("td")
            previewContainer.appendChild(td1)
            previewContainer.appendChild(td2)
            previewContainer.appendChild(td3)
            previewContainer.appendChild(td4)
            previewContainer.setAttribute("id","preview")
            table.appendChild(previewContainer)
        }else if (regex.test(document.getElementById("amount").value) === true && document.getElementById("amount").style.borderColor === "red"){
            document.getElementById("amount").style.borderColor = "rgb(221, 221, 221)"
            amount.innerText = document.getElementById("amount").value + "$"
            table.append(newRow)
            newRow.appendChild(name)
            newRow.appendChild(date)
            newRow.appendChild(amount)
            newRow.appendChild(eliminateContainer)
            eliminateContainer.append(eliminate)
            arr.push(document.getElementById("amount").value)
            let sum = arr.reduce((p,c) =>{
                return parseInt(p) + parseInt(c)
            })
            number.innerText = sum + " $"
            sumText.innerText = "Total: "
        }else {
            amount.innerText = document.getElementById("amount").value + "$"
            table.append(newRow)
            newRow.appendChild(name)
            newRow.appendChild(date)
            newRow.appendChild(amount)
            newRow.appendChild(eliminateContainer)
            eliminateContainer.append(eliminate)
            arr.push(document.getElementById("amount").value)
            let sum = arr.reduce((p,c) =>{
                return parseInt(p) + parseInt(c)
            })
            number.innerText = sum + " $"
            sumText.innerText = "Total: "
        }
})


table.addEventListener("click",(e)=>{
    if(e.target.classList.contains("eliminate")){
        let removedIndex = arr.indexOf(parseInt(e.target.parentNode.previousElementSibling.innerText).toString())
        arr.splice(removedIndex,1)
        let sum2 = arr.reduce((p,c) =>{
            return parseInt(p) + parseInt(c)
        },0)
        console.log(sum2);
        if(sum2 === 0){
            console.log("hey");
            e.target.parentNode.parentNode.remove()
            e.target.remove(); 
            totalTable.style.display = "none"
            let previewContainer = document.createElement("tr")
            let td1 = document.createElement("td")
            let td2 = document.createElement("td")
            let td3 = document.createElement("td")
            let td4 = document.createElement("td")
            previewContainer.appendChild(td1)
            previewContainer.appendChild(td2)
            previewContainer.appendChild(td3)
            previewContainer.appendChild(td4)
            previewContainer.setAttribute("id","preview")
            table.appendChild(previewContainer)
        }else{
            number.innerText = sum2 + " $"
            sumText.innerText = "Total: "
            e.target.parentNode.parentNode.remove()
            e.target.remove(); 
        }
    }
})