import { Ref, computed } from "vue";

export const useTextDimensions = (text: Ref<string> | string, el = document.body) => {
  const font = getCanvasFont(el);
  const width = computed(() => (text as Ref<string>).value)
  return { width };
}
function getTextWidth(text: string, font: string): number {
  // re-use canvas object for better performance
  // @ts-ignore
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function getCssStyle(element: Element, prop: string) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

