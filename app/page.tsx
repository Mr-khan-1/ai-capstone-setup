import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to SiteScope AI</h1>
      <p className="mb-8">
        Instantly audit any website for SEO and accessibility issues using AI.
      </p>
      <Link 
        href="/audit" 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Start an Audit
      </Link>
    </div>
  );
}
