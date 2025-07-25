import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import React from 'react'

export default function Social() {
    return (
        <div className="flex flex-wrap gap-1 justify-center items-center sm:gap-3 md:gap-2">
            <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E4405F] transition-colors"
            >
                <Instagram className="w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5" />
            </a>
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1877F3] transition-colors"
            >
                <Facebook className="w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5" />
            </a>
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1DA1F2] transition-colors"
            >
                <Twitter className="w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5" />
            </a>
            <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0077B5] transition-colors"
            >
                <Linkedin className="w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5" />
            </a>
            <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF0000] transition-colors"
            >
                <Youtube className="w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5" />
            </a>
        </div>
    )
}
