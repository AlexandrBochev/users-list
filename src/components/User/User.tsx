import { TUser } from "../../data/usersData"

interface UserProps {
  data: TUser
}

const User = ({ data }: UserProps) => {

  return (
    <li className="w-full flex justify-between bg-gray-50 border rounded p-2 mb-2 mr-2">
      <span>
        {data.firstName} {data.lastName} | {data.hair.color} | {data.birthDate} | {data.gender} | {data.email}</span>
    </li>
  )
}

export { User }