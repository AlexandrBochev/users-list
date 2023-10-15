import { useEffect, useState } from "react";
import { TUser } from "../../data/usersData"
import { User } from "../User/User"
import { ModalForm } from "../ModalForm/ModalForm";

// # Users list and form with api

// 1. ✔ Update User list component to fetch data from api
// 2. ✔ Add loading state to User list component (show loading message while list is loading)
// 3. ✔ Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
// 4. ✔ Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. ✔ Form to create user needs to have the following inputs
//    ✔ 1. User first name (text input)
//    ✔ 2. User last name (text input)
//    ✔ 3. User hair color (select input)
//    ✔ 4. User birthDate (datetime input)
//    ✔ 5. User is female (checkbox input)
//    ✔ 6. User email (email input)
// ✔ 6. Add form validation to the form component
//    ✔ 1. User first name is required
//    ✔ 2. User last name is required
//    ✔ 3. User email is required and should be valid email
//    ✔ 4. User birthDate is required and should be valid date
// ✔ 7. Form submit button of the form component should be disabled if form is invalid
// ✔ 8. Show error message for invalid fields

type UsersType = TUser & {
  position: number
}

const Users = () => {
  const [users, setUsers] = useState<UsersType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:3004/users')
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  for (let i = 0; i < users.length; i++) {
    users[i].position = i + 1
  }

  const handleMoveUsers = (position: number, direction: string) => {
    const asyncMoveUsers = async () => {
      const updatedUsers = [...users]
      const userIndex = updatedUsers.findIndex((user) => user.position === position)

      if (userIndex === -1) {
        return
      }

      if (direction === 'Up' && userIndex > 0) {
        updatedUsers[userIndex] = users[userIndex - 1]
        updatedUsers[userIndex - 1] = users[userIndex]
      }
      if (direction === 'Down' && userIndex < updatedUsers.length - 1) {
        updatedUsers[userIndex] = users[userIndex + 1]
        updatedUsers[userIndex + 1] = users[userIndex]
      }

      for (let i = 0; i < updatedUsers.length; i++) {
        if (updatedUsers[i].position !== users[i].position) {
          await fetch(`http://localhost:3004/users/${users[i].position}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUsers[i]),
          })
        }
      }
      fetchUsers()
    }
    asyncMoveUsers()
  }

  const handleShowModal = () => setShowModal(prev=> !prev)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newUser = {
      firstName: (e.currentTarget[0] as HTMLInputElement).value,
      lastName: (e.currentTarget[1] as HTMLInputElement).value,
      hair: {color: (e.currentTarget[2] as HTMLSelectElement).value},
      birthDate: (e.currentTarget[3] as HTMLInputElement).value,
      gender: (e.currentTarget[4] as HTMLInputElement).checked ? 'female' : 'male',
      email: (e.currentTarget[5] as HTMLInputElement).value,
    }

    const addUser = async () => {
      await fetch('http://localhost:3004/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      fetchUsers()
    }
    addUser()
    handleShowModal()
  }

  return (
    <>
    { showModal && <ModalForm data={ users } handleShowModal={ handleShowModal } handleSubmit={ handleSubmit } /> }
    <h1 className="text-xl text-center font-semibold mb-8">Users List</h1>
    <button
      onClick={ handleShowModal }
      className="p-2 w-full rounded-md mb-4 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
    >
      Add New User
    </button>
    <ul className="bg-gray-100 border rounded p-4">
      { loading ? "Loading..." : users.map(user => (
        <div key={ user.id } className="flex items-center">
          <p className="mr-4">{ user.position }</p>
          <User data={ user } />
          <div className="flex">
            <button onClick={ ()=> handleMoveUsers(user.position, 'Up') } className="mr-4">⇧</button>
            <button onClick={ ()=> handleMoveUsers(user.position, 'Down') }>⇩</button>
          </div>
        </div>
      ))}
    </ul>
    </>
  )
}

export { Users }