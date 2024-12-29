'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Play, MusicNote } from 'react-bootstrap-icons';
import 'styles/theme.scss';
import NavbarVertical from '/layouts/navbars/NavbarVertical';
import NavbarTop from '/layouts/navbars/NavbarTop';

export default function DashboardLayout({ children }) {
    const [showMenu, setShowMenu] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef(null); // Reference for the audio element

    const ToggleMenu = () => setShowMenu(!showMenu);
    const ToggleDarkMode = () => setDarkMode(!darkMode);

    const fadeInAudio = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0;
            audioRef.current.play();
            let fadeInInterval = setInterval(() => {
                if (audioRef.current.volume < 1) {
                    audioRef.current.volume += 0.05;
                } else {
                    clearInterval(fadeInInterval);
                }
            }, 50);
        }
    };

    const fadeOutAudio = () => {
        if (audioRef.current) {
            let fadeOutInterval = setInterval(() => {
                if (audioRef.current.volume > 0) {
                    audioRef.current.volume -= 0.05;
                } else {
                    clearInterval(fadeOutInterval);
                    audioRef.current.pause();
                }
            }, 50);
        }
    };

    const toggleAudio = () => {
        if (audioPlaying) {
            fadeOutAudio();
        } else {
            // Change the sound before playing
            changeAudio();
            fadeInAudio();
        }
        setAudioPlaying(!audioPlaying);
    };

    const changeAudio = () => {
        if (audioRef.current) {
            audioRef.current.src = getRandomAudioUrl();
            audioRef.current.load(); // Reload the audio to apply the new src
        }
    };

    useEffect(() => {
        document.body.className = darkMode ? 'bg-dark' : 'bg-light';
    }, [darkMode]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (currentScrollY / documentHeight) * 100;

            setScrollProgress(scrolled);

            if (currentScrollY > lastScrollY) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const getRandomAudioUrl = () => {
        const randomNum = Math.floor(Math.random() * 119) + 1;
        return `https://raw.githubusercontent.com/AyGemuy/Sound/main/sound${randomNum}.mp3`;
    };

    return (
        <div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
            <div className={`header-card ${showHeader ? 'fade-in' : 'fade-out'}`}>
                <div className="header-content">
                    <h5 className="header-title">{darkMode ? 'Welcome 🌙' : 'Welcome ☀️'}</h5>
                </div>
            </div>

            <div
                className="scroll-progress"
                style={{ height: `${scrollProgress}%` }}
            ></div>

            <div className="navbar-vertical navbar">
                <NavbarVertical
                    showMenu={showMenu}
                    onClick={(value) => setShowMenu(value)}
                />
            </div>

            <div id="page-content">
                <NavbarTop
                    data={{
                        showMenu: showMenu,
                        SidebarToggleMenu: ToggleMenu,
                    }}
                />
                {children}
            </div>

            {/* Hidden Audio Element with Loop */}
            <audio ref={audioRef} loop hidden>
                <source src={getRandomAudioUrl()} type="audio/mp3" />
            </audio>

            {/* Floating Play Audio Button */}
            <button onClick={toggleAudio} className="btn-toggle-mode left-up-one">
                <MusicNote size={20} />
            </button>

            {/* Floating Dark Mode Toggle Button */}
            <button onClick={ToggleDarkMode} className="btn-toggle-mode left">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Floating Play Toggle Button */}
            <Link href="/playground" passHref>
                <button className="btn-toggle-mode right">
                    <Play size={20} />
                </button>
            </Link>
        </div>
    );
}
