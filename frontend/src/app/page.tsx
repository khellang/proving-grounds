import dynamic from "next/dynamic";

// Novorender's API doesn't work with SSR :(
const RenderView = dynamic(() => import("@/components/render-view"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <RenderView
        sceneId="95a89d20dd084d9486e383e131242c4c"
        renderState={{ grid: { enabled: true } }}
      />
    </main>
  );
}
