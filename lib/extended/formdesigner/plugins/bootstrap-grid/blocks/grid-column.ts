import { BlockProperties, Editor } from "grapesjs";

export default function(editor: Editor, props: BlockProperties) {

  editor.BlockManager.add('grid-column', {
    label: 'Column',
    category: 'Grid',
    media: "<svg fill=\"#000000\" viewBox=\"0 0 32 32\" id=\"icon\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><defs><style>.cls-1{fill:none;}</style></defs><title>column</title><rect x=\"24\" y=\"4\" width=\"2\" height=\"24\"></rect><path d=\"M18,6V26H14V6h4m0-2H14a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z\"></path><rect x=\"6\" y=\"4\" width=\"2\" height=\"24\"></rect><rect id=\"_Transparent_Rectangle_\" data-name=\"<Transparent Rectangle>\" class=\"cls-1\" width=\"32\" height=\"32\"></rect></g></svg>",
    content: {
      type: 'grid-column'
    }
  });

}