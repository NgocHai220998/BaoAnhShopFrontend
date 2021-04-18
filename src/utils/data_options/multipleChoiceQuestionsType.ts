interface MultipleChoiceQuestionsType {
  slug: string;
  vi: string;
}

export const multipleChoiceQuestionsType: MultipleChoiceQuestionsType[] = [{
  slug: "CAU_HOI_TU_VUNG",
  vi: "Câu hỏi về từ vựng"
}, {
  slug: "CAU_HOI_TU_LOAI",
  vi: "Câu hỏi về phân loại từ"
}, {
  slug: "CAU_HOI_CACH_DUNG_TU",
  vi: "Câu hỏi về cách dùng từ"
}, {
  slug: "CAU_HOI_KHAC",
  vi: "Loại câu hỏi khác"
}]

export const convertSlugToViMCQ = (key: string = "chua-xac-dinh"): string => {
  switch (key) {
    case "CAU_HOI_TU_VUNG":
      return "Câu hỏi về từ vựng";
    case "CAU_HOI_TU_LOAI":
      return "Câu hỏi về phân loại từ";
    case "CAU_HOI_CACH_DUNG_TU":
      return "Câu hỏi về cách dùng từ";
    default:
      return "Loại câu hỏi khác";
  }
}
