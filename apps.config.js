
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayGedit } from './components/apps/gedit';
import { displayTerminalCalc } from './components/apps/calc';
import { displayProjects } from './components/apps/projects';
import { displaySkills } from './components/apps/skills';
import { displayContact } from './components/apps/contact';
import { displayAbout } from './components/apps/about';

const apps = [
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChrome,
    },
     {
        id: "projects",
        title: "Portfolio Projects",
        icon: './themes/Yaru/apps/projects.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayProjects,
    },
      {
        id: "about",
        title: "Who am i",
        icon: './themes/Yaru/apps/about.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAbout,
    },
    {
        id: "skills",
        title: "My Skills",
        icon: './themes/Yaru/apps/skills.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displaySkills,
    },
      {
        id: "contacts",
        title: "Contact Me",
        icon: './themes/Yaru/apps/contacts.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayContact,
    },
    {
        id: "calc",
        title: "Calc",
        icon: './themes/Yaru/apps/calc-kali.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminalCalc,
    },

    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/terminal.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/settings.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySettings,
    },

    {
        id: "gedit",
        title: "Contact Me",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayGedit,
    },
]

export default apps;