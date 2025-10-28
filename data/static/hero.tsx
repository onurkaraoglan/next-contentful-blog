import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export const heroData = {
  title: {
    plainText: "Hi, I am ",
    highlightText: "Onur Karaoğlan",
    subTitle: "Full Stack Engineer building amazing web experiences",
    highlight: ["amazing"],
  },
  profileCard: {
    title: "Onur Karaoğlan",
    subTitle: "Fullstack Software Developer",
    body: `Hey! I'm Onur Karaoğlan, a Full Stack Engineer from Ankara, Turkey. I love creating web and mobile apps that work smoothly behind the scenes and feel great for people to use. I enjoy helping teams, sharing what I know, and taking on new challenges along the way`,
    socialUrls: [
      {
        url: "https://www.linkedin.com/in/onurkaraoglan/",
        icon: <FaLinkedinIn size={20} />,
      },
      {
        url: "https://github.com/onurkaraoglan",
        icon: <FaGithub size={20} />,
      },
    ],
    tooltip: {
      imagePath: "/images/me.jpeg",
      title: "Hey...",
      subTitle: "That's me!",
    },
  },
};

