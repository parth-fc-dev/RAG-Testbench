export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-700 dark:text-gray-400 text-right">
          Built by Parth. The source code is available on{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:underline font-medium"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
