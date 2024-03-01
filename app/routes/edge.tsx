import { Await, Link, useLoaderData } from "@remix-run/react";
import { defer, type MetaFunction } from "@vercel/remix";
import { Suspense } from "react";

export const config = { runtime: "edge" };

export const meta: MetaFunction = () => [
  { title: "Remix@Edge | New Remix App" },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loader() {
  return defer({
    message: sleep(1000).then(() => "Yes you can!"),
  });
}

export default function Edge() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Can you defer on the edge?</h1>
      <Suspense fallback="Loading...">
        <Await resolve={message}>{(message) => <p>{message}</p>}</Await>
      </Suspense>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}
