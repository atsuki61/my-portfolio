export default function Footer() {
  return (
    <footer className="bg-white text-black py-6">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row justify-between items-center px-4">
        {/* 著作権表示 */}
        <p className="text-sm">© {new Date().getFullYear()} Atsuki. All rights reserved.</p>
      </div>
    </footer>
  );
}
