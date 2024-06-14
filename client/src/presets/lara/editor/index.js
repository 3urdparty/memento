export default {
  root: ({ props, state }) => ({}),
  toolbar: ({ props, state }) => ({
    class: ['rounded-t-md !border bg-slate-800 !border-slate-600'],
  }),
  formats: ({ props, state }) => ({
    class: [],
  }),
  header: ({ props, state }) => ({
    class: ['!border-slate-900 border'],
  }),
  option: ({ props, state }) => ({
    class: ['!text-green-800'],
  }),
  bold: ({ props, state }) => ({
    class: ['!text-green-600'],
  }),
  italic: ({ props, state }) => ({
    class: [],
  }),
  underline: ({ props, state }) => ({
    class: [],
  }),
  color: ({ props, state }) => ({
    class: [],
  }),
  background: ({ props, state }) => ({
    class: ['border !border-slate-900'],
  }),
  list: ({ props, state }) => ({
    class: [],
  }),
  select: ({ props, state }) => ({
    class: [],
  }),
  link: ({ props, state }) => ({
    class: [],
  }),
  image: ({ props, state }) => ({
    class: [],
  }),
  codeBlock: ({ props, state }) => ({
    // class: [],
  }),
  clean: ({ props, state }) => ({
    class: [],
  }),
  content: ({ props, state }) => ({
    // class: ['rounded-b-md bg-slate-900 !border-slate-600'],
  }),
  hooks: ({ props, state }) => ({
    class: [],
  }),
};
