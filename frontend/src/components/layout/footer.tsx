import { HashLink as Link } from 'react-router-hash-link';
import lightLogoText from "../../assets/images/lightLogoText.png";
import logo from "../../assets/images/lightLogo.png";
import { Button } from "../ui/button";


export default function Footer() {

    const homeLinks = [
        {
            link: "/#explore",
            text: "Explore"
        },
        {
            link: "/#about",
            text: "About"
        },
        {
            link: "/#shop",
            text: "Shop Smart"
        },
        {
            link: "/#chef",
            text: "Your Personal Chef"
        },
        {
            link: "/#join",
            text: "Join Us"
        },
    ]

    return (
        <footer className="bg-mydarkgreen py-10 border-t-2 border-gray-100 mt-auto">
            <section className="h-full px-7">
                <Link smooth className="flex gap-1 h-full" to="/" reloadDocument>
                    <img className="w-9 my-auto" src={logo} alt="Logo" />
                    <img className="w-30 my-auto" src={lightLogoText} alt="Shop4Food" />
                </Link>
            </section>
            <div className="grid sm:grid-cols-2">
                <section className="pt-5 px-10 flex flex-col justify-start items-start">
                    <h2 className="text-white font-header text-xl mb-3">About</h2>
                    {homeLinks.map((item, index) => (
                        <Link smooth to={item.link} key={index}>
                            <Button variant="footLink" size="footSize">{item.text}</Button>
                        </Link>
                    ))}
                </section>
                <section className="pt-5 px-10">
                    <h2 className="text-white font-header text-xl mb-5">Connect</h2>
                    <div className="flex gap-3 items-center">
                        <Button className="w-9" variant="ghost" size="icon-sm">
                            <img className="invert" src="https://www.svgrepo.com/show/447133/facebook-fill.svg" />
                        </Button>
                        <Button className="px-0.5" variant="ghost" size="icon-sm">
                            <img className="invert" src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/all-icons/twitter-x-1fhy50xzcvkl246hf5ua4.png/twitter-x-jyw81k7vr85ry57c7ym2d.png?_a=DATAiZAAZAA0" />
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                            <img className="invert rounded-md" src="https://staging.svgrepo.com/show/143563/linkedin.svg" />
                        </Button>
                        <Button className="w-10" variant="ghost" size="icon-sm">
                            <img className="invert" src="https://www.svgrepo.com/show/340624/logo-youtube.svg" />
                        </Button>
                    </div>
                </section>
            </div>
        </footer>
    );
}