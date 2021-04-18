interface VocabularyType {
  type: string;
  description: string;
}

export const vocabularyTypes: VocabularyType[] = [{
  type: "Noun-Verb",
  description: "Danh từ, danh từ sở hữu cách thêm の"
}, {
  type: "Noun",
  description: "Danh từ"
}, {
  type: "Verb",
  description: "Động từ"
}, {
  type: "Verb-1",
  description: "Động từ nhóm I"
}, {
  type: "Verb-2",
  description: "Động từ nhóm II"
}, {
  type: "Verb-3",
  description: "Động từ nhóm III"
}, {
  type: "Adjective",
  description: "Tính từ"
}, {
  type: "Adjective-i",
  description: "Tính từ - Tính từ đuôi い"
}, {
  type: "Adjective-na",
  description: "Tính từ - Tính từ đuôi な"
}, {
  type: "Noun-Adjective-i",
  description: "Danh từ - Tính từ đuôi い"
}, {
  type: "Noun-Adjective-na",
  description: "Danh từ - Tính từ đuôi な"
}, {
  type: "Adverb",
  description: "Trạng từ"
}, {
  type: "Preposition",
  description: "Giới từ"
}, {
  type: "Other",
  description: "Chưa xác định"
}]


export const convertTypeToDescriptionVC = (key: string = "Other"): string => {
  switch (key) {
    case "Noun-Verb":
      return "Danh từ, danh từ sở hữu cách thêm の";
    case "Noun":
      return "Danh từ";
    case "Verb":
      return "Động từ";
    case "Verb-1":
      return "Động từ nhóm I";
    case "Verb-2":
      return "Động từ nhóm II";
    case "Verb-3":
      return "Động từ nhóm II";
    case "Adjective":
      return "Tính từ";
    case "Adjective-i":
      return "Tính từ - Tính từ đuôi い";
    case "Adjective-na":
      return "Tính từ - Tính từ đuôi な";
    case "Noun-Adjective-i":
      return "Danh từ - Tính từ đuôi い";
    case "Noun-Adjective-na":
      return "Danh từ - Tính từ đuôi な";
    case "Adverb":
      return "Trạng từ";
    case "Preposition":
      return "Giới từ";
    default:
      return "Chưa xác định";
  }
}
