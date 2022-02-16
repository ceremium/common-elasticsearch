/**
 * Transform a JSON object
 */
class JSONTransformer {
  transform(o: any, _options: any) {
    // create plain json objects from mongoose ones if passed
    const res = typeof o.toObject === 'function' ? o.toObject() : o;

    return res;
  }
}

export default JSONTransformer;
