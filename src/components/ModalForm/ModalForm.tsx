import { useRef, useState } from "react"
import { TUser } from "../../data/usersData"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ButtonProps {
  data: TUser[]
  handleShowModal: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const date = /^\d{4}-\d{2}-\d{2}$/
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ModalForm = ({ data, handleShowModal, handleSubmit }: ButtonProps) => {
  const [disabledBtn, setdisabledBtn] = useState(true)

  const nameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const birthDateRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const hairColor: string[] = ["Other"]
  for (const color of data) {
    if (!hairColor.includes(color.hair.color)) {
      hairColor.push(color.hair.color)
    }
  }

  const handleBlurName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      toast.error(`${e.target.placeholder} must be at least 3 characters long`, {autoClose: 3000})
    }
  }

  const handleBlurBirthDate = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!date.test(e.target.value)) {
      toast.error("Date must be in YYYY-MM-DD format", {autoClose: 4000})
    }
    if (e.target.value > new Date().toISOString().split('T')[0]) {
      toast.error("Date must be in the past", {autoClose: 4000})
    }
  }

  const handleBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!email.test(e.target.value)) {
      toast.error("Email must be in email format", {autoClose: 4000})
    }
  }

  const handleChange = () => {
    if (
      nameRef.current?.value?.length! > 2 &&
      lastNameRef.current?.value?.length! > 2 &&
      date.test(birthDateRef.current?.value!) &&
      birthDateRef.current?.value! < new Date().toISOString().split('T')[0] &&
      email.test(emailRef.current?.value!)
    ) {
      setdisabledBtn(false)
    } else {
      setdisabledBtn(true)
    }
  }

  const stylesBtn = `p-2 w-full rounded-md ${disabledBtn ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white cursor-pointer'}`

  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
      <div onClick={ handleShowModal } className="absolute w-full h-full top-0 left-0 bg-black opacity-80" />
      <form onSubmit={ handleSubmit } method="post" className="relative bg-gray-100 rounded-md p-8 z-10">
        <button onClick={ handleShowModal } className="absolute top-4 right-4">🗙</button>
        <h1 className="text-lg font-semibold mb-4">Add New User</h1>
        <div>
          <input onChange={ handleChange } onBlur={ handleBlurName } ref={nameRef} type="text" placeholder="First name" required className="p-2 w-full border border-gray-300 rounded-md mb-4" />
          <ToastContainer />
        </div>
        <div>
          <input onChange={ handleChange } onBlur={ handleBlurName } ref={lastNameRef} type="text" placeholder="Last name" required className="p-2 w-full border border-gray-300 rounded-md mb-4" />
        </div>
        <div>
          <label htmlFor="hairColor">Select Your Hair Color:</label>
          <select id="hairColor" name="hairColor" className="p-2 w-full border border-gray-300 rounded-md mb-4">
            {hairColor.map((color) => <option key={color} value={color} >{color}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="birthDate">Select Birth Date:</label>
          <input onChange={ handleChange } onBlur={ handleBlurBirthDate } ref={birthDateRef} type="date" id="birthDate" name="birthDate" required className="p-2 w-full border border-gray-300 rounded-md mb-4" />
        </div>
        <div className="flex mb-4">
          <input type="checkbox" id="isFemale" className="mr-2" />
          <label htmlFor="isFemale">Is Female</label>
        </div>
        <div>
          <input onChange={ handleChange } onBlur={ handleBlurEmail } ref={emailRef} type="email" id="userEmail" name="email" placeholder="Enter email" className="p-2 w-full border border-gray-300 rounded-md mb-4" />
        </div>
        <button
          type="submit"
          disabled={ disabledBtn }
          className={ stylesBtn }
        >
          Add User
        </button>
      </form>
    </div>
  )
}

export { ModalForm }