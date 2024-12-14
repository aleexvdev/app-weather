export const Footer = () => {
  return (
    <footer className="w-full h-full py-6">
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Weather Dashboard by Alexander Valverde
      </p>
    </footer>
  )
}
