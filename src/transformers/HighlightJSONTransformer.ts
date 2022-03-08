class HighlightJSONTransformer {
  transform(o: any, mapping: any = {}): any {
    const highlight: any = {};
    if (o.highlight) {
      Object.keys(o.highlight).forEach((key) => {
        const mapped = mapping[key];
        if (mapped) {
          highlight[mapped] = o.highlight[key].toString();
        }
      });
    }
    return highlight;
  }
}

export default HighlightJSONTransformer;
