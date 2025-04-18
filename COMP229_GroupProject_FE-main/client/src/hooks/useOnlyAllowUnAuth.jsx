import { useNavigate } from "react-router-dom"
import useGlobalStore from "@/store/GlobalStore"
import { useEffect } from "react"

const useOnlyAllowUnAuth = (redirectTo = "/") => {
    const navigate = useNavigate()
    const isAuth = useGlobalStore(state => state.isAuth)
    useEffect(()=>{
        if(isAuth){
            navigate(redirectTo)
        }
    },[isAuth])
    return 
}

export default useOnlyAllowUnAuth