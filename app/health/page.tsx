async function checkHealth() {
  // Simulate fetching data asynchronously
  await new Promise((resolve) => setTimeout(resolve, 50));
  return { status: "ok", timestamp: new Date().toISOString() };
}

export default async function HealthPage() {
  const data = await checkHealth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Health Check</h1>
      <pre className="bg-gray-100 text-black p-4 rounded text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
