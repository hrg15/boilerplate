import Image from "next/image";
import { Github, ExternalLink, Code2, Package, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-4xl px-8 py-16">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              className="overflow-hidden rounded-full dark:invert"
              src="/logo.png"
              alt="Boilerplate Logo"
              width={180}
              height={38}
              priority
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Next.js Boilerplate
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-400">
            A modern, production-ready Next.js boilerplate with TypeScript,
            Tailwind CSS, and essential development tools pre-configured for
            rapid development.
          </p>
        </header>

        {/* Features Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
            <div className="mb-4 flex items-center">
              <Code2 className="mr-3 h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                TypeScript Ready
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Fully configured with TypeScript for type-safe development and
              better DX.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
            <div className="mb-4 flex items-center">
              <Package className="mr-3 h-8 w-8 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Modern Stack
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Includes React Query, Zustand, Tailwind CSS, and other essential
              tools.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
            <div className="mb-4 flex items-center">
              <Rocket className="mr-3 h-8 w-8 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Production Ready
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Optimized build configuration and deployment-ready setup.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16 rounded-lg bg-white p-8 shadow-md dark:bg-slate-800">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">
            Built With
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div className="p-4">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                Next.js 15
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                React Framework
              </div>
            </div>
            <div className="p-4">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                TypeScript
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Type Safety
              </div>
            </div>
            <div className="p-4">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                Tailwind CSS
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Styling
              </div>
            </div>
            <div className="p-4">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                React Query
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Data Fetching
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Get Started
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:text-base dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              href="https://github.com/hrg15/boilerplate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
            <a
              className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-full border border-slate-300 px-6 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:text-base dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800"
              href="https://vercel.com/new/clone?repository-url=https://github.com/hrg15/boilerplate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-5 w-5" />
              Deploy Now
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-200 pt-8 text-center dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400">
            Built with ❤️ using Next.js. Check out the{" "}
            <a
              href="https://github.com/hrg15/boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              source code
            </a>{" "}
            on GitHub.
          </p>
        </footer>
      </div>
    </div>
  );
}
