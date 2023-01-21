let budget_btn = document.getElementById("budget-btn");
let budget = document.getElementById("budget");
let t_budget = document.getElementById("Total-budget");
let product_btn = document.getElementById("product-btn");
let title = document.getElementById("title");
let cost  = document.getElementById("cost");
let expence_list = document.getElementById("expence-list");
let expence = document.getElementById("expence");
let balence = document.getElementById("balence");






// store in local storage

 budget_btn.onclick = function (e){
  e.preventDefault();
  location.href = location.href;
  
  if(budget.value != ""){
localStorage.setItem("Budget", budget.value);
  }else {
    alert("Budget field is empty.")
  }
 }

//store product in local storage
product_btn.onclick = function(e){
  e.preventDefault();

if(title.value != "" && cost.value != ""){
         
  var p_title = title.value;
  var p_cost = cost.value;

  var data = {p_cost : p_cost, p_title : p_title};
 var string = JSON.stringify(data);

 localStorage.setItem("Budget_"+title.value,string);
 location.href = location.href;

 
}else {
  alert("field is empty");
}
}




//retrive data from local storage

function all_data(){


for(let i = 0; i<localStorage.length; i++){
 
let all_key = localStorage.key(i);

if(all_key.match("Budget_")){

  let json_data = localStorage.getItem(all_key);
  let json_parse = JSON.parse(json_data);


  

expence_list.innerHTML +=`<div class="arrange"><div class="inner"><h3>`+json_parse.p_title+`</h3><h3 class="price">`+json_parse.p_cost+`</h3></div><div><i class="fa fa-edit edit-btn" style="font-size:30px; margin:10px;" ></i><i class="fa fa-trash delete-btn" style="font-size:30px; margin:10px;"></i> </div></div>`

}
}

let price_tag = document.getElementsByClassName("price");
let price =[];


for(let j = 0; j<price_tag.length; j++){
price[j] = price_tag[j].innerHTML ;
}

price_int = [];

for(let a = 0; a<price.length; a++){
  price_int.push(parseInt(price[a]));
}

let final_price = 0;
for(let b = 0; b<price_int.length; b++){
  final_price += price_int[b];
}

expence.innerHTML = final_price;

t_budget.innerHTML= localStorage.getItem("Budget");

let f_budget = t_budget.innerHTML;
let t_expence= expence.innerHTML ;


balence.innerHTML = f_budget-t_expence;

    // start delete code

let delete_btn = document.getElementsByClassName("delete-btn");

for(let c = 0; c<delete_btn.length; c++){

 delete_btn[c].onclick = function (){
 

  let conferm = window.confirm("Do you want to delete it?");

  if(conferm){
  let del_parent = this.parentElement;
  
  let div_parent = del_parent.parentElement;
  let h5 = div_parent.firstChild.childNodes[0].innerHTML;
 localStorage.removeItem("Budget_"+h5);
  location.href = location.href;


  } else {
    alert("Your data is safe");
  }
 }
}
// start edit code


let edit_btn = document.getElementsByClassName("edit-btn");

for( let d = 0; d<edit_btn.length; d++){
  edit_btn[d].onclick = function(){

    let cnf = window.confirm("Do you want to update it?");
    if(cnf){
                  
    let edit_parent = this.parentElement;
    let col_parent = edit_parent.parentElement;


   let h5_data = col_parent.firstChild.childNodes[0].innerHTML;
   let h5_price =  col_parent.firstChild.childNodes[1].innerHTML;
   

   title.value = h5_data;
   cost.value = h5_price;
   title.focus();
   product_btn.innerHTML = "Update your data!";
   product_btn.style.backgroundColor = "red";



product_btn.onclick = function(){


  localStorage.removeItem("Budget_"+h5_data);

    
  let p_title = title.value;
  let p_cost = cost.value;

  let data = {p_cost : p_cost, p_title : p_title};
 let string = JSON.stringify(data);

 localStorage.setItem("Budget_"+title.value,string);

}

    }else {
      alert("Your data is safe... ");
    }
  }
}

}
all_data();