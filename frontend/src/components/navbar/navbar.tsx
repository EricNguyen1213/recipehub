import logo from "../../assets/images/logo.png";
import logoText from "../../assets/images/logoText.png";
import { BiSolidFoodMenu } from "react-icons/bi";
import { Button } from "@/components/ui/button";


interface NavBarProps {
  variant?: "explore" | "default";
}

export default function NavBar({ variant="default" }: NavBarProps) {
  const variants: Record<"explore" | "default", React.ReactNode> = {
    "explore": <BiSolidFoodMenu size="2.5em" className="text-mydarkgreen" />,
    "default": <></>
  }
  return (
    <nav className="bg-white w-full grid grid-cols-[1fr_3fr] h-15 shadow-lg sticky top-0 z-50">
      <section className="grid grid-cols-[1fr_4fr]">
        <div className="ml-auto my-auto">
            {variants[variant]}
        </div>
        <div className="flex gap-1 justify-end my-auto">
            <img className="w-10" src={logo} alt="Logo" />
            <img className="w-40" src={logoText} alt="Shop4Food" />
        </div>
      </section>
      <section className="flex items-center">
        <Button variant="outline">Sign In</Button>
        <Button>Sign Up</Button>
      </section>
    </nav>
  )
}