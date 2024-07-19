const add=document.querySelector(".add");
const totalNotes=document.querySelector(".total-notes");
const enterArea=document.querySelector(".add-notes")

let textArray=[];

function savedata(){
    localStorage.setItem('notes',JSON.stringify(textArray))
}
function editText(value,index){
     textArray[index].text=value;
     savedata();
     renderData();
}

function deletecontent(value){
   textArray=textArray.filter((ele)=>{
        return ele.id!=Number(value);
   })
   savedata();
   renderData();
}

function renderData(){
    totalNotes.innerHTML='';

    textArray.forEach((notes,index)=>{
        
        const combineNotes=document.createElement('div');
        combineNotes.classList.add('.combine-notes');

        const headBtns=document.createElement('div');
        headBtns.classList.add('head-btns')

        const edit=document.createElement('img');
        edit.src='/new_edit_now.png';
        edit.classList.add('edit');
        headBtns.appendChild(edit);

        const del=document.createElement('img');
        del.src='/new_delete.png';
        del.classList.add('edit');
        headBtns.appendChild(del);
        
        combineNotes.appendChild(headBtns);

        const textArea=document.createElement('div');
        textArea.classList.add("text");
        textArea.textContent=notes.text;
        textArea.setAttribute('contenteditable','false');
       
        combineNotes.appendChild(textArea);

        edit.addEventListener('click',()=>{
            textArea.setAttribute('contenteditable','true');
            textArea.addEventListener('blur', () => {
                textArea.setAttribute('contenteditable', 'false');
                editText(textArea.textContent.trim(), index);
            });
            
        })

        del.addEventListener('click',()=>{
            const value=notes.id;
            deletecontent(value);
        })

        totalNotes.appendChild(combineNotes);
    })
   
}
add.addEventListener('click',()=>{
    const content=enterArea.value.trim();
    if(content===""){
        alert("Notes is not Entered");
    }
    else{

     const textObject={
        text:content,
        id:Math.random()*100
       }
       enterArea.value='';
     textArray.push(textObject);
     savedata();
     renderData();

    }
    
})

// localStorage.removeItem('notes');
function getdate(){
    const stored=JSON.parse(localStorage.getItem('notes'))
    if(stored){
        textArray=stored;
        renderData();
    }
    
}

window.onload=getdate;
 
// localStorage.removeItem("note");