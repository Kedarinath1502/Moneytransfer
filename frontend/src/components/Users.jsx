import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUser] = useState([]);
    const [filter, setFilter] = useState('');
    console.log(users + "hi");
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then((res) => {
                console.log("Axios Response:", res);
                setUser(res.data.user);
            })
            .catch((error) => {
                console.error("Axios Error:", error);
            });
    }, [filter]);
    return (
        <div>

            <div className="font-bold mt-6">
                Users
            </div>
            <div className="my-2  mr-4 ml-4 pb-4">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} placeholder="search here" className="w-full px-2 py-1 border rounded border-slate-200" ></input>
            </div>
            <div>
                {users && users.map((user) => <User key={user._id} user={user} />)}
            </div>
        </div>

    )
}

export const User = ({ user }) => {
    const navi = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstname} {user.lastname}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-ful">
                <Button onClick={() => {
                    navi("/moneytransfer?id=" + user._id + "&name=" + user.firstname);
                }} label={"Send Money"} />
            </div>
        </div>
    )
}

