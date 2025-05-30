// Anything that we want to ALWAYS be displayed (i.e. is always in <App /> component)
// Includes header, navigation and imput/date selectors.

interface NavProps {
  selectedDate: string
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Nav({ selectedDate, onDateChange }: NavProps) {
  return <header className="header"></header>
}

export default Nav
