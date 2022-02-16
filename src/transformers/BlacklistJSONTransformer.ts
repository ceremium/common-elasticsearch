import JSONTransformer from './JSONTransformer';
/**
 * Transform a JSON object by removing all attributes
 * that appear on a blacklist
 */
class BlacklistTransformer extends JSONTransformer {
  /**
   * Remove all blacklisted attributes
   *
   * @param {object} o the object to transform
   * @param {array} options.blacklist attributes to remove
   */
  transform(o: any, options: any) {
    const res = super.transform(o, options);

    if (options && options.blacklist) {
      options.blacklist.forEach((attribute: string | number) => {
        delete res[attribute];
      });
    }

    return res;
  }
}

export default BlacklistTransformer;
