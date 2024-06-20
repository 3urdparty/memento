import { Field } from "@backend/decks/schemas/deck.schema";
import { reactive } from "vue"

export const useForm = (initialValues: { [key: string]: Field }) => {
  const form = reactive(initialValues)
  const values = () => {
    let result: { [key: string]: string | File | string[] } = {};
    for (const key in form) {
      // if (typeof form[key].show === 'function' && form[key].show() || form[key].show) continue;
      const field = form[key];
      result[field.name ?? key] = form[key].value;
    }
    return result;
  };

  const clear = () => {
    for (const key in form) {
      form[key].value = null;
    }
  }
  return {
    form,
    values,
    clear
  }
}
