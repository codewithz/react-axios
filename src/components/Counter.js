import React,{useState,useEffect} from 'react'

export default function Counter() {
    const[count,setCount]=useState(0);
    const[name,setName]=useState('Zartab');
    const[country,setCountry]=useState('India'); 

    useEffect(() => {
        document.title=`You have clicked ${count} times`;
      
    },[count,name])



   const clickHandler=()=>{
        setCount(count+1);
    }
    return (
        <div>
            
            <button className="btn btn-warning" onClick={clickHandler}>Click Me</button>
            <br />
            <label>Counter: {count}</label>

        </div>
    )
}
