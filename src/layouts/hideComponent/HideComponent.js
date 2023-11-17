import React, {useEffect,useState} from 'react'
import { useLocation} from 'react-router-dom'

const HideComponent = ({children}) => {
    const location = useLocation();
    const [showComponent,setShowComponent] = useState(false);

    useEffect(()=>{
        if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname.includes('/forgetPassword/')){
            setShowComponent(false)
        }
        else{
            setShowComponent(true)
        }
    },[location])

  return (
    <div>{showComponent && children}</div>
  )
}

export default HideComponent