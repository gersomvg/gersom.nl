export default (rgbaString: string, opacity: number): string =>
  rgbaString.replace(
    /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
    `rgba$1,${opacity})`
  );
