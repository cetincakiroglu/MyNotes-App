import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [userInfo, setUserInfo] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const value = {
        userInfo,
        setUserInfo,
        name,
        setName,
        surname,
        setSurname
    }

    return (
        <UserContext.Provider value={{ userInfo: userInfo, setUserInfo: setUserInfo, name: name, setName: setName, surname: surname, setSurname: setSurname }}>
            { props.children }
        </UserContext.Provider>
    )
}