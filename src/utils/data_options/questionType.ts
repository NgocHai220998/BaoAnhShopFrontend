interface QuestionType {
  type: string;
  description: string;
}

export const questionTypes: QuestionType[] = [{
  type: "MultipleChoiceQuestion",
  description: "Câu hỏi trắc nghiệm 4 đáp án"
}, {
  type: "FillBlank",
  description: "Điền đáp án vào chỗ trống"
}, {
  type: "Sort",
  description: "Bài đánh dấu sao"
}]


export const convertTypeToDescriptionQS = (key: string = "Other"): string => {
  switch (key) {
    case "FillBlank":
      return "Điền đáp án vào chỗ trống";
    case "MultipleChoiceQuestion":
      return "Câu hỏi trắc nghiệm 4 đáp án";
    case "Sort":
      return "Bài đánh dấu sao";
    default:
      return "Chưa xác định";
  }
}
