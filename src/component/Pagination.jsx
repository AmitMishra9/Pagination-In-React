import React,{useState,useEffect} from 'react'


function Pagination() {
  const [userData,setuserData]= useState([]); 
  const [currentPage,setCurrentPage]=useState(1);
  const [totalPage,setTotalPage]=useState(0);

  const APU_URL="https://jsonplaceholder.typicode.com/posts"
  
  useEffect(()=>{
      fetch(APU_URL)
      .then((res)=>res.json())
      .then((data)=>{
         setuserData(data);
         setTotalPage(Math.ceil(data.length/10));
      })
  },[])

  // current page function 
const handlePageChange=(newpage)=>{
      setCurrentPage(newpage)    
   }

const handlenextClick=()=>{
    if(currentPage<totalPage){
        setCurrentPage(currentPage+1)
    }

}

const handlePrevClick = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
}

const prevDisabled = currentPage===1;
const nextDisabled= currentPage===totalPage;

const itemperpage=10;
const startIndex=(currentPage-1)*itemperpage;
const endIndex= startIndex+ itemperpage;
const itemToDisplay= userData.slice(startIndex,endIndex);


    return (
    <> 
     
       <h1>Pagination  In  React</h1>
       {
        itemToDisplay && itemToDisplay.length > 0 ? itemToDisplay.map((item,index)=>{
              return(
                 <h3 key={item.id}>{item.id} {item.title}</h3>
               )
        })  : ''
      }


     <button onClick={handlePrevClick}
         disabled={prevDisabled}
        >prv</button>  
      {
           Array.from({length:totalPage},(_,i)=>{
            return (
                <button 
                onClick={()=>handlePageChange(i+1)} 
                key={i}
                disabled={i+1===currentPage}
                >
                {i+1}</button>
            )

          
           }) 
      }
      
        

      <button onClick={handlenextClick}
      disabled={nextDisabled}
     >Next</button> 
        
      
     </>
  )
}

export default Pagination