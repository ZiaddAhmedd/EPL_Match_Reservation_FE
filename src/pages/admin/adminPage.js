
import React from 'react';
import UserCard from '../../generic components/admin/userCard';
import axios from 'axios';
import classes from './admin.module.css';

function Admin() {

    const [usersData,setUsersData ] = React.useState([]);
    async function getData() {
    // console.log("requesting")

    // var config = {
    //     method: 'get',
    //     headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
    // };
    // let response = '';
    // try {

    //     response = await axios.get("http://localhost:3001/users/all-users",config).then((res) => res.data);
    //     return (response);

    // } catch (error) {
    //     if (error.response) {
    //     return (error.response);
    //     }
    // }
    // return (response);
    }



    // React.useEffect(() => {
    // (async () => {
    //     const resp = await getData();
    //     setUsersData(resp);
    // })();
    // }, []);

    // React.useEffect(() => {
    //     // console.log(ProfileInfo);
    //     console.log(usersData);
    // }, [usersData]);

    React.useEffect(() => {
        const usersData = require('./data/userData.json');
        setUsersData(usersData);
    }, []);

    const userList = usersData.map((item) => {
            return(          
            <div>
                <UserCard 
                key={item._id}
                username={item.username} 
                email={item.email}
                id={item._id}
                exist = {0}
                />
            </div>)
        }
    )

    return (
        <div className={classes.admin}>
        <h1 className={classes.header}> Admin Page </h1>
        <h2 className={classes.subheader}>Users List</h2>
            <div className={classes.sub0}>
                
            </div>
            <div className={classes.userList}>
                {userList}
            </div>
        </div>
    )
}

export default Admin;