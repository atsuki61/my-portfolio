import { Github } from 'lucide-react';
import { FaSquareXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-6">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center px-4">
        {/* 著作権表示 */}
        <p className="text-sm">© {new Date().getFullYear()} Atsuki. All rights reserved.</p>

        {/* SNSアイコンリンク */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/atsuki61" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5 hover:text-gray-600" />
          </a>
          <a href="https://x.com/atsuki_prog_ai" target="_blank" rel="noopener noreferrer" aria-label="X">
            <FaSquareXTwitter className="w-5 h-5 hover:text-gray-600" />
          </a>
        </div>
      </div>
    </footer>
  );
}
