import logo from "../../assets/logo.png";
import logoText from "../../assets/logoText.png";


export default function NavBar() {
  return (
    <nav className="bg-white w-full py-2 grid grid-cols-[1fr_2fr_1fr] ">
      <section className="flex justify-center items-center gap-3">
        <img className="w-14" src={logo} alt="Logo" />
        <img className="w-50" src={logoText} alt="Shop4Food" />
      </section>
      <section className="">
        hi
      </section>
      <section className="">
        my
      </section>
    </nav>
  )
}