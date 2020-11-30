import React, {useState, useEffect} from 'react'

const User = () => {

    const [users, setUsers] = useState([])

    useEffect(()=>
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(res =>  setUsers(res) )
    )

    return (
        <div>
            <ul>
                {
                        users.map(user => (
                            <li key={user.id} >
                                {user.name}
                            </li>
                        ))
                }
            </ul>
        </div>
    )
}

export default User
