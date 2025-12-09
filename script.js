let transactions = JSON.parse(localStorage.getItem('transactions'))||[
    {description:"Salary",amount:8000,type:"income",category:"Salary",month:"Jan",id:1},
    {description:"Groceries",amount:1200,type:"expense",category:"Food",month:"Jan",id:2},
    {description:"Gift",amount:500,type:"income",category:"Gift",month:"Jan",id:3},
    {description:"Movie",amount:300,type:"expense",category:"Entertainment",month:"Feb",id:4}
];

const balanceEl=document.getElementById("balance"),
incomeEl=document.getElementById("income"),
expenseEl=document.getElementById("expense"),
transactionsEl=document.getElementById("transactions"),
addBtn=document.getElementById("addBtn"),
monthFilter=document.getElementById("monthFilter"),
categoryFilter=document.getElementById("categoryFilter"),
descriptionInput=document.getElementById("description"),
amountInput=document.getElementById("amount"),
typeInput=document.getElementById("type"),
categoryInput=document.getElementById("category"),
monthInput=document.getElementById("month");

let balance=0,totalIncome=0,totalExpense=0;

// Charts
const financeChart=new Chart(document.getElementById('financeChart').getContext('2d'),{
    type:'doughnut',data:{labels:['Income','Expense'],datasets:[{data:[0,0],backgroundColor:['#2e7d32','#c62828']}]},
    options:{responsive:true,plugins:{legend:{position:'bottom'}}}
});

const monthlyChart=new Chart(document.getElementById('monthlyChart').getContext('2d'),{
    type:'bar',data:{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets:[{label:"Income",data:Array(12).fill(0),backgroundColor:"#2e7d32"},
    {label:"Expense",data:Array(12).fill(0),backgroundColor:"#c62828"}]},options:{responsive:true,plugins:{legend:{position:'top'}}}
});

const categoryChart=new Chart(document.getElementById('categoryChart').getContext('2d'),{
    type:'pie',data:{labels:[],datasets:[{data:[],backgroundColor:[]}]} ,options:{responsive:true,plugins:{legend:{position:'bottom'}}}
});

// Functions
function updateUI(){
    balance=totalIncome-totalExpense;
    balanceEl.textContent=balance;
    balanceEl.style.color=balance<0?'red':'#2e7d32';
    incomeEl.textContent=totalIncome;
    expenseEl.textContent=totalExpense;
    updateCharts();
}

function updateCharts(){
    financeChart.data.datasets[0].data=[totalIncome,totalExpense]; financeChart.update();
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let mIncome=Array(12).fill(0), mExpense=Array(12).fill(0);
    transactions.forEach(tx=>{const i=months.indexOf(tx.month); if(tx.type==="income") mIncome[i]+=tx.amount; else mExpense[i]+=tx.amount;});
    monthlyChart.data.datasets[0].data=mIncome; monthlyChart.data.datasets[1].data=mExpense; monthlyChart.update();
    let catTotals={}; transactions.forEach(tx=>{catTotals[tx.category]=(catTotals[tx.category]||0)+tx.amount;});
    categoryChart.data.labels=Object.keys(catTotals); categoryChart.data.datasets[0].data=Object.values(catTotals);
    categoryChart.data.datasets[0].backgroundColor=["#4caf50","#c62828","#ff9800","#2196f3","#9c27b0","#f44336","#00bcd4"];
    categoryChart.update();
}

function renderTransactions(list=transactions){
    transactionsEl.innerHTML="";
    list.forEach(tx=>{const li=document.createElement("li"); li.className=tx.type;
        li.innerHTML=`<span>${tx.description} - $${tx.amount} (${tx.type},${tx.category},${tx.month})</span>
        <button class="delete-btn" onclick="deleteTransaction(${tx.id})">Delete</button>`; transactionsEl.appendChild(li);
    });
}

function recalcTotals(list=transactions){totalIncome=0; totalExpense=0; list.forEach(tx=>{if(tx.type==="income") totalIncome+=tx.amount; else totalExpense+=tx.amount;});}

function deleteTransaction(id){transactions=transactions.filter(t=>t.id!==id);saveData();applyFilters();}

function saveData(){localStorage.setItem('transactions',JSON.stringify(transactions));}

function applyFilters(){
    const m=monthFilter.value,c=categoryFilter.value;
    let filtered=transactions.filter(tx=>(m==="all"||tx.month===m)&&(c==="all"||tx.category===c));
    recalcTotals(filtered); updateUI(); renderTransactions(filtered);
}

function addTransaction(){
    const d=descriptionInput.value.trim(),a=parseFloat(amountInput.value),t=typeInput.value,cat=categoryInput.value,m=monthInput.value;
    if(!d||isNaN(a)){alert("Enter valid description and amount"); return;}
    const tx={description:d,amount:a,type:t,category:cat,month:m,id:Date.now()};
    transactions.push(tx); saveData(); recalcTotals(transactions); updateUI(); renderTransactions(); 
    descriptionInput.value=""; amountInput.value=""; 
}

// Initialize
recalcTotals(transactions); updateUI(); renderTransactions();

addBtn.addEventListener("click",addTransaction);
monthFilter.addEventListener("change",applyFilters);
categoryFilter.addEventListener("change",applyFilters);
