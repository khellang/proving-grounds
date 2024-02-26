import dynamic from "next/dynamic";

const RenderView = dynamic(() => import("@/components/render-view"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-slate-900">
      <RenderView />
    </main>
  );
}
