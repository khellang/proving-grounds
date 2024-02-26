import { SceneData, createAPI } from "@novorender/data-js-api";
import { View } from "@novorender/api";

const dataApi = createAPI({
  serviceUrl: "https://data.novorender.com/api",
});

export const loadPublicScene = async (view: View, id: string) => {
  const sceneData = await dataApi.loadScene(id);

  // Destructure relevant properties into variables
  const { url: _url } = sceneData as SceneData;
  const url = new URL(_url);
  const parentSceneId = url.pathname.replaceAll("/", "");
  url.pathname = "";

  // load the scene using URL gotten from `sceneData`
  const config = await view.loadScene(url, parentSceneId, "index.json");

  const { center, radius } = config.boundingSphere;

  view.activeController.autoFit(center, radius);
};
