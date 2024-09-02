'use client';

import { AddUser, DeleteUser, FetchUsers, UpdateUser } from "@/actions";
import { useState, useEffect } from "react";

export default function CrudPage() {
    const [data, setData] = useState({userid: "", username: "", usermail: "", imageurl: ""});
    const [users, setUsers] = useState([]);

    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    const fetchUsers = async () => {
        const result = await FetchUsers();
        if(result.success) {
            setUsers(result.data);
        } else {
            console.log(result.message);
        }
    }

    useEffect (()=>{ fetchUsers();},[])

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            const result = await UpdateUser(editUserId, data);
            console.log(result);
            setEditMode(false);
            setEditUserId(null);
        } else {
            const result = await AddUser(data);
            console.log(result);
        }
        setData({ userid: "", username: "", usermail: "", imageurl: "" });
        fetchUsers();
    }

    const handleDelete = async (userId) => {
        const result = await DeleteUser(userId);
        console.log(result);
        if (result.success) {
            fetchUsers();
        }
    };

    const handleEdit = (user) => {
        setEditMode(true);
        setEditUserId(user._id);
        setData({ userid: user.userid, username: user.username, usermail: user.usermail, imageurl: user.imageurl });
    };
    return (
        <>
            <h1>Image CRUD</h1>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="userid">UserId</label>
                <input required type="text" placeholder="Enter UserId" name="userid" id="userid" value={data.userid} onChange={e=>setData({...data, userid: e.target.value})} /><br />

                <label htmlFor="username">UserName</label>
                <input required type="text" placeholder="Enter UserName" name="username" id="username" value={data.username} onChange={e=>setData({...data, username: e.target.value})} /><br />

                <label htmlFor="usermail">UserMail</label>
                <input required type="text" placeholder="Enter UserMail" name="usermail" id="usermail" value={data.usermail} onChange={e=>setData({...data, usermail: e.target.value})} /><br />

                <label htmlFor="imageurl">UserImage</label>
                <input required type="url" placeholder="Enter ImageURL" name="imageurl" id="imageurl" value={data.imageurl} onChange={e=>setData({...data, imageurl: e.target.value})} /><br />

                <input type="submit" value={editMode ? "Update" : "Submit"} />
            </form>
            <div>
                <h1>Display Data</h1>
                {
                    users.map((list) => (
                        <div key={list._id}>
                            <p>{list.userid}</p>
                            <p>{list.username}</p>
                            <p>{list.usermail}</p>
                            <img src={list.imageurl} alt={list.username} width="100px" height="100px" />
                            <button onClick={() => handleDelete(list._id)}>Delete</button>
                            <button onClick={() => handleEdit(list)}>Update</button>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
