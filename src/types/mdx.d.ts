declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module '@mdx-js/react' {
  export const MDXProvider = any;
}
