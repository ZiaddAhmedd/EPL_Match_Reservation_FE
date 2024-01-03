
import React from 'react';
import UserCard from '../../generic components/admin/userCard';
import classes from './admin.module.css';
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import MyToaster from "../../generic components/toaster/MyToaster";
import { useState, useEffect } from "react";
import NavBar from "../../layouts/nav/NavBar";

function Admin() {

    const [notVerifiedUsers, setNotVerifiedUsers] = useState([]);
    const [allUsersData, setAllUsersData] = useState([]);

    async function getNotVerifiedUsers() {
        const resp = await axios.get(routes.getNotVerifiedUser);
        return resp.data;
    }

    async function getAllUsers() {
        const resp = await axios.get(routes.getallUser);
        return resp.data;
    }

    useEffect(() => {
        (async () => {
            const notVerifiedUsersRes = await getNotVerifiedUsers();
            setNotVerifiedUsers(notVerifiedUsersRes);
            const allUsersRes = await getAllUsers();
            setAllUsersData(allUsersRes);

            })();
    }, []);

    const notVerifiedUserList = notVerifiedUsers.user?.map((item) => {
            return(        
                <UserCard 
                key={item._id}
                id = {item._id}
                username={item.firstName + " " + item.lastName}
                email={item.email}
                role={item.role}
                verified = {item.verified}
                />
            )
        }
    )

    const allUserList = allUsersData.users?.map((item) => {
        return(        
            <UserCard 
            key={item._id}
            id = {item._id}
            username={item.firstName + " " + item.lastName}
            email={item.email}
            role={item.role}
            verified = {item.verified}
            />
        )
    }
)

    return (
        
        <div>
            <NavBar />
            <div className={classes.admin}>
                
                <MyToaster />
                <h1 className={classes.header}> Admin Page </h1>
                <div className={classes.main}>
                    <div className={classes.userList}>
                    <h2 className={classes.subheader}>All Users</h2>
                        {allUserList}
                    </div>
                <div className={classes.userList}>
                    <h2 className={classes.subheader}>Verify Users</h2>
                        {notVerifiedUserList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;