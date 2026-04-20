import logo from "../../assets/images/logo.png";
import logoText from "../../assets/images/logoText.png";
import { BiSolidFoodMenu } from "react-icons/bi";


export default function NavBar() {
  return (
    <nav className="bg-white w-full grid grid-cols-[1fr_3fr] h-15 shadow-xl/20 sticky top-0 z-50">
      <section className="grid grid-cols-[1fr_4fr]">
        <div className="ml-auto my-auto">
            <BiSolidFoodMenu size="2.5em" className="text-mydarkgreen" />
        </div>
        <div className="flex gap-1 m-auto">
            <img className="w-10" src={logo} alt="Logo" />
            <img className="w-40" src={logoText} alt="Shop4Food" />
        </div>
      </section>
      <section className="">
        my
      </section>
    </nav>
  )
}