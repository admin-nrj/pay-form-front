import './App.css';
import Card from "./components/card/Card";
import PopUp from "./components/PopUp/PopUp";
import {useCallback, useState} from "react";

function App() {
  const [options, setPopUp] = useState({isShow:false, type:'', message:''})

  const showPopUpHandler = useCallback((type,message) =>{
    setPopUp({isShow: true, type, message })

    const t=setInterval(()=>{
        clearInterval(t);
        setPopUp({...options, isShow: false})
    },5000)

  },[options])

  return (
      <>
        <Card showPopUpHandler={showPopUpHandler}/>
        <PopUp options={options}/>
      </>

  );
}

export default App;
