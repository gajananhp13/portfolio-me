export type Skill = {
    title: string;
    bg: string;
    fg: string;
    icon: React.ReactNode;
};

import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";

export const PROJECT_SKILLS = {
    next: {
        title: "Next.js",
        bg: "black",
        fg: "white",
        icon: <RiNextjsFill />,
    },
    react: {
        title: "React.js",
        bg: "black",
        fg: "white",
        icon: <RiReactjsFill />,
    },
    framerMotion: {
        title: "Framer Motion",
        bg: "black",
        fg: "white",
        icon: null, // Icon handled in component if needed or add generic icon
    },
    shacdn: {
        title: "ShadCN UI",
        bg: "black",
        fg: "white",
        icon: null,
    },
    tailwind: {
        title: "Tailwind CSS",
        bg: "black",
        fg: "white",
        icon: null,
    }
};
