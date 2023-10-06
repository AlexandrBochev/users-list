import { useState } from "react";
import usersData from "../../data/usersData"
import { TUser } from "../../data/usersData"
import { User } from "../User/User"

// ✓ TODO: implement function to delete user
// ✓ TODO: create new list of users without deleted user
// ✓ TODO: call setUsers with new list of users
// ✓ TODO: pass handleDelete to User component
// ✓ TODO: Add "Move Up" and "Move Down" buttons to each of the user
// ✓ TODO: Implement functions to move user up/down the list
// ✓ TODO: Make sure you create new list of users, do not mutate existing list
// ✓ TODO: Call setUsers with new list of users
// ✓ TODO: Pass handleMoveUp and handleMoveDown to User component as props

const Users = () => {
  const [users, setUsers] = useState<TUser[]>(usersData)

  const handleDelete = (user: TUser) => {
    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) { 
      console.log("deleting", user) 
      const newUsers = users.filter((u) => u.id !== user.id)
      setUsers(newUsers)
    }
  }

  const handleMoveUp = (userToMove: TUser) => {
    const userIndex = users.findIndex((user) => user === userToMove)
    if (userIndex > 0) {
      const updatedUsers = [...users];
      [updatedUsers[userIndex - 1], updatedUsers[userIndex]] = [updatedUsers[userIndex], updatedUsers[userIndex - 1]]
      setUsers(updatedUsers)
    }
  }

  const handleMoveDown = (userToMove: TUser) => {
    const userIndex = users.findIndex((user) => user === userToMove)
    if (userIndex < users.length - 1) {
      const updatedUsers = [...users];
      [updatedUsers[userIndex], updatedUsers[userIndex + 1]] = [updatedUsers[userIndex + 1], updatedUsers[userIndex]]
      setUsers(updatedUsers)
    }
  }

  return (
    <>
    <h1 className="text-xl text-center font-semibold mb-8">Users List</h1>
    <ul className="bg-gray-100 border rounded p-4">
      {users.map(user => (
        <User
          data={ user }
          key={ user.id }
          onDelete={ handleDelete }
          onMoveUp={ handleMoveUp }
          onMoveDown={ handleMoveDown }
        />
      ))}
    </ul>
    </>
  )
}

export { Users }