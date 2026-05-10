(function (global) {
  const INITIALS = {};
  "bpmfdtnlgkhjqxrzcsyw".split("").forEach((c) => (INITIALS[c] = c));
  INITIALS.v = "zh";
  INITIALS.i = "ch";
  INITIALS.u = "sh";
  INITIALS.o = "";

  const FINAL_OPTIONS = {
    q: ["iu"],
    w: ["ua", "ia"],
    e: ["e"],
    r: ["uan", "er"],
    t: ["ue", "ve"],
    y: ["uai", "v"],
    o: ["uo", "o"],
    p: ["un"],
    a: ["a"],
    s: ["ong", "iong"],
    d: ["uang", "iang"],
    f: ["en"],
    g: ["eng"],
    h: ["ang"],
    j: ["an"],
    k: ["ao"],
    l: ["ai"],
    ";": ["ing"],
    z: ["ei"],
    x: ["ie"],
    c: ["iao"],
    v: ["ui"],
    b: ["ou"],
    n: ["in"],
    m: ["ian"],
    u: ["u"],
    i: ["i"],
  };

  const LEGAL_FINALS_BY_INITIAL = {
    "": ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "er", "o", "ou"],
    b: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "i", "ian", "iao", "ie", "in", "ing", "o", "u"],
    p: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "i", "ian", "iao", "ie", "in", "ing", "o", "ou", "u"],
    m: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "i", "ian", "iao", "ie", "in", "ing", "o", "ou", "u"],
    f: ["a", "an", "ang", "en", "eng", "o", "u"],
    d: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ian", "iao", "ie", "ing", "iu", "ong", "ou", "u", "uan", "ui", "un", "uo"],
    t: ["a", "ai", "an", "ang", "ao", "e", "eng", "i", "ian", "iao", "ie", "ing", "ong", "ou", "u", "uan", "ui", "un", "uo"],
    n: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "i", "ian", "iang", "iao", "ie", "in", "ing", "iu", "ong", "ou", "u", "uan", "un", "uo", "v", "ve"],
    l: ["a", "ai", "an", "ang", "ao", "e", "ei", "eng", "i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iu", "ong", "ou", "u", "uan", "un", "uo", "v", "ve"],
    g: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
    k: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
    h: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
    j: ["i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "u", "uan", "ue", "v"],
    q: ["i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "u", "uan", "ue", "v"],
    x: ["i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "u", "uan", "ue", "v"],
    r: ["an", "ang", "ao", "e", "en", "eng", "i", "ong", "ou", "u", "uan", "ui", "un", "uo"],
    z: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ong", "ou", "u", "uan", "ui", "un", "uo"],
    c: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ong", "ou", "u", "uan", "ui", "un", "uo"],
    s: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ong", "ou", "u", "uan", "ui", "un", "uo"],
    zh: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
    ch: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
    sh: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
    y: ["a", "an", "ang", "ao", "e", "i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "u", "uan", "ue", "un", "v"],
    w: ["a", "ai", "an", "ang", "ei", "en", "o", "u", "ua", "uai", "uan", "uang", "ui", "un"],
  };

  const LEGAL_FINAL_KEYS = new Set(
    Object.entries(LEGAL_FINALS_BY_INITIAL).flatMap(([initial, finals]) =>
      finals.map((final) => `${initial}:${final}`)
    )
  );

  function getInitial(key) {
    return Object.prototype.hasOwnProperty.call(INITIALS, key) ? INITIALS[key] : undefined;
  }

  function getFinalOptions(key) {
    return FINAL_OPTIONS[key] || [];
  }

  function renderPinyin(initial, final) {
    if (initial === "") return final;

    if (final === "v") {
      if ("jqxy".includes(initial[0])) return initial + "u";
      return initial + "v";
    }

    if (final === "ve") {
      if ("jqx".includes(initial[0])) return initial + "ue";
      return initial + "ve";
    }

    if (initial === "y") {
      const yFinals = {
        i: "yi",
        in: "yin",
        ing: "ying",
        ia: "ya",
        ian: "yan",
        iang: "yang",
        iao: "yao",
        ie: "ye",
        iong: "yong",
        iu: "you",
        u: "yu",
        uan: "yuan",
        ue: "yue",
        un: "yun",
      };
      return yFinals[final] || initial + final;
    }

    if (initial === "w") {
      const wFinals = {
        u: "wu",
        ua: "wa",
        uai: "wai",
        uan: "wan",
        uang: "wang",
        ui: "wei",
        un: "wen",
      };
      return wFinals[final] || initial + final;
    }

    return initial + final;
  }

  const LEGAL_PINYIN = new Set(
    [...LEGAL_FINAL_KEYS].map((key) => {
      const separator = key.indexOf(":");
      return renderPinyin(key.slice(0, separator), key.slice(separator + 1));
    })
  );

  function isLegalFinal(initial, final) {
    return LEGAL_FINAL_KEYS.has(`${initial}:${final}`);
  }

  function isLegalPinyin(pinyin) {
    return LEGAL_PINYIN.has(pinyin);
  }

  function getLegalCandidates(k1, k2) {
    const initial = getInitial(k1);
    if (initial === undefined) return [];

    return getFinalOptions(k2)
      .map((final) => ({
        initial,
        final,
        pinyin: renderPinyin(initial, final),
      }))
      .filter((candidate) => isLegalFinal(candidate.initial, candidate.final) && isLegalPinyin(candidate.pinyin));
  }

  function resolvePair(k1, k2) {
    const initial = getInitial(k1);
    const fallbackFinal = getFinalOptions(k2)[0] || "";
    const candidates = getLegalCandidates(k1, k2);

    if (initial === undefined || !fallbackFinal) {
      return { status: "invalid", initial, final: fallbackFinal, pinyin: "", candidates };
    }

    if (candidates.length === 1) {
      return { status: "valid", ...candidates[0], candidates };
    }

    if (candidates.length > 1) {
      return {
        status: "ambiguous",
        initial,
        final: candidates[0].final,
        pinyin: candidates[0].pinyin,
        candidates,
      };
    }

    return {
      status: "invalid",
      initial,
      final: fallbackFinal,
      pinyin: renderPinyin(initial, fallbackFinal),
      candidates,
    };
  }

  function displayFinal(final) {
    return final.replace(/ve/g, "üe").replace(/v/g, "ü");
  }

  function getInitialDisplay(key) {
    const map = { v: "zh", i: "ch", u: "sh", o: "零" };
    return map[key] || key;
  }

  const api = {
    FINAL_OPTIONS,
    INITIALS,
    LEGAL_PINYIN,
    displayFinal,
    getFinalOptions,
    getInitial,
    getInitialDisplay,
    getLegalCandidates,
    isLegalFinal,
    isLegalPinyin,
    renderPinyin,
    resolvePair,
  };

  global.ShuangpinMapping = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
