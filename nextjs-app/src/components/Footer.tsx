export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-700 text-right">
          Built by Parth. The source code is available on{" "}
          <a
            href="https://github.com/parth-fc-dev/RAG-Testbench"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline font-medium"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
