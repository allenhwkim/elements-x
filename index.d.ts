declare module '*.css?inline' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.html?raw" {
  const content: string;
  export default content;
}
