import { type showdown } from 'vue-showdown'
export const BlanksExtension = (): showdown.ShowdownExtension[] => [{
  type: 'lang',
  regex: /\[(.*?)\]/g,
  replace: (match: string, captured: string) => {
    console.log(match)
    return `<span class="rounded-b-none border-b border-0 border-green-400 mx-0.5" contenteditable="true">
${captured}
 </span>`}
}
];

