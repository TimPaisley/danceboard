export default function Layout({ children }) {
  return (
    <main className="flex flex-col h-screen w-full p-8 bg-white dark:bg-gray-800">{children}</main>
  )
}
