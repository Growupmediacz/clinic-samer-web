import logo from '../assets/images/logo-mark.png';
import desk from '../assets/images/doctor-at-desk.webp';
import ultrasound from '../assets/images/mudr-asad-ultrasound.webp';
import nurse from '../assets/images/nurse-portrait.webp';
import newborn from '../assets/images/newborn-emotion.webp';
import ivf from '../assets/images/ivf-poster.jpg';
import heroArt from '../assets/images/hero-illustration.webp';

export const img = { logo, desk, ultrasound, nurse, newborn, ivf, heroArt };

const familyModules = import.meta.glob<{ default: ImageMetadata }>('../assets/images/rodiny/*.webp', { eager: true });
/** Fotky rodin 1–10 (zveřejněno se souhlasem rodin). */
export const families = Object.keys(familyModules).sort().map((k) => familyModules[k].default);
