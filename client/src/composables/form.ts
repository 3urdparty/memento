import { Field } from "@backend/decks/schemas/deck.schema";
import { reactive } from "vue"

export const useForm = (initialValues: { [key: string]: Field }) => {
  const form = reactive(initialValues)
  const values = () => {
    let result: { [key: string]: string | File | string[] } = {};
    for (const key in form) {
      const field = form[key];
      result[field.name ?? key] = form[key].value;
    }
    return result;
  };

  return {
    form,
    values
  }
}
