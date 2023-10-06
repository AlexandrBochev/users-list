import { useState } from "react"
import { TUser } from "../../data/usersData"
import { Button } from "../Button/Button"

// ✓ TODO: add delete button to each of the user
// ✓ TODO: implement logic to delete user
// ✓ TODO: add a Like button to each of the user
// ✓ TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
// ✓ TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
// ✓ TODO: display hart icon if user is liked (💝)

interface UserProps {
  data: {
    firstName: string
    lastName: string
  }
  onDelete: (user: TUser) => void
  onMoveUp: (user: TUser) => void
  onMoveDown: (user: TUser) => void
}

const User = ({ data, onDelete, onMoveUp, onMoveDown }: UserProps) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = () => onDelete(data as TUser)
  const handleMoveUp = () => onMoveUp(data as TUser)
  const handleMoveDown = () => onMoveDown(data as TUser)
  const handleClickLike = () => setIsLiked(!isLiked)

  return (
    <li className="w-full flex justify-between bg-gray-50 border rounded p-2 mb-2 hover:scale-105 hover:shadow-md">
      <div>
        <Button onClick={ handleMoveUp }>⇧</Button>
        <Button onClick={ handleMoveDown }>⇩</Button>
      </div>
      <span>{data.firstName} {data.lastName}</span>
      <div>
        <Button onClick={ handleClickLike }>{ isLiked ? "🤎" : "🤍" }</Button>
        <Button onClick={ handleClick }>❌</Button>
      </div>
    </li>
  )
}

export { User }