interface ISdkLibrary {
  load: (name: string) => any;
}

declare var library: ISdkLibrary;
