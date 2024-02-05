import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

export const Sendsuccess = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-slate-500 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white flex flex-col justify-center rounded h-40 w-80 text-center font-serif from-stone-950">
                    transaction successful ...👍👍👍

                </div>
                <div className="flex flex-col justify-end">
                    <Button onClick={() => {
                        navigate("/dashboard");
                    }} label={"Go to dashboard"} />

                </div>
            </div>

        </div>
    )
} 