const assert = require("node:assert/strict");
const {
  FINAL_OPTIONS,
  INITIALS,
  getLegalCandidates,
  resolvePair,
} = require("../shuangpin-mapping.js");

const firstKeys = Object.keys(INITIALS);
const secondKeys = Object.keys(FINAL_OPTIONS);

const ambiguousPairs = [];
for (const firstKey of firstKeys) {
  for (const secondKey of secondKeys) {
    const candidates = getLegalCandidates(firstKey, secondKey);
    if (candidates.length > 1) {
      ambiguousPairs.push(
        `${firstKey}${secondKey}: ${candidates.map((candidate) => candidate.pinyin).join(", ")}`
      );
    }
  }
}

assert.deepEqual(ambiguousPairs, [], "Every key pair should resolve to at most one legal pinyin");

const expectedPairs = {
  ny: "nv",
  nt: "nve",
  ly: "lv",
  lt: "lve",
  xy: "xu",
  xt: "xue",
  yd: "yang",
  yr: "yuan",
  yp: "yun",
  ys: "yong",
  yt: "yue",
  yy: "yu",
  wo: "wo",
  wu: "wu",
  go: "guo",
  bo: "bo",
  oo: "o",
  oa: "a",
  oe: "e",
  or: "er",
  ob: "ou",
};

for (const [keys, pinyin] of Object.entries(expectedPairs)) {
  const result = resolvePair(keys[0], keys[1]);
  assert.equal(result.status, "valid", `${keys} should be valid`);
  assert.equal(result.pinyin, pinyin, `${keys} should resolve to ${pinyin}`);
}

const invalidPairs = ["nv", "lv", "aa", "ee", "av"];
for (const keys of invalidPairs) {
  const result = resolvePair(keys[0], keys[1]);
  assert.equal(result.status, "invalid", `${keys} should be invalid`);
}

console.log(`Checked ${firstKeys.length * secondKeys.length} key pairs with no ambiguous legal mappings.`);
