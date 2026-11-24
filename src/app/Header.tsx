import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <div className="self-start flex justify-end items-center p-4">
      <ThemeToggle />
    </div>
  )
}
