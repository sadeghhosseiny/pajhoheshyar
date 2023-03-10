import { useRouter } from 'next/router'
import { useEffect } from 'react'


const AuthProvider = (props) => {

    const router = useRouter()

    useEffect(() => {
        let token = localStorage.getItem("cook")
        if (!token) {
            router.push("/auth")
        }
    }, [])

    return (
        <div>
        {props.children}
        </div>
    )
}

export default AuthProvider