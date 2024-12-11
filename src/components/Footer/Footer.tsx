import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";
import { VscGithubInverted } from "react-icons/vsc";

import "./Footer.scss";

interface SocialLink {
    href: string;
    icon: JSX.Element;
    className: string;
}

const Footer = () => {
    const socialLinks: SocialLink[] = [
        {
            href: "https://github.com/jolle11",
            icon: <VscGithubInverted />,
            className: "footer__link"
        },
        {
            href: "https://www.linkedin.com/in/jordi-oll%C3%A9-ballest%C3%A9-8398b181/",
            icon: <FaLinkedinIn />,
            className: "footer__link footer__link--linkedin"
        },
        {
            href: "https://jordi0lle.hashnode.dev/",
            icon: <SiHashnode />,
            className: "footer__link footer__link--hashnode"
        },
        {
            href: "https://twitter.com/jordi0lle",
            icon: <FaXTwitter />,
            className: "footer__link footer__link--twitter"
        },
        {
            href: "https://www.instagram.com/jordi0lle/",
            icon: <AiFillInstagram />,
            className: "footer__link footer__link--instagram"
        }
    ];

    return (
        <div className="footer">
            <p className="footer__text">Created by Jordi Ollé</p>
            <p className="footer__info">
                Data from{" "}
                <a
                    href="https://www.frankfurter.app/"
                    className="footer__info footer__info--link"
                >
                    Frankfurter App
                </a>
            </p>
            <div className="footer__links">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={link.className}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Footer;
