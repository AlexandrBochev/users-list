interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={ onClick }
      className="hover:scale-125 active:scale-110 p-1 mx-1"
    >
      { children }
    </button>
  )
}

export { Button }